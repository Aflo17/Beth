'use client';

import { useState, useEffect } from 'react';
import { useAuth } from '@/lib/auth/context';
import { createClient } from '@/lib/supabase/client';
import { Video } from '@/types';
import { Upload, Trash2, Eye, EyeOff, Plus, Loader2 } from 'lucide-react';

export default function AdminPage() {
  const { user, loading } = useAuth();
  const [videos, setVideos] = useState<Video[]>([]);
  const [uploading, setUploading] = useState(false);
  const [loadingVideos, setLoadingVideos] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const supabase = createClient();

  useEffect(() => {
    if (!loading && user) {
      checkAdminAccess();
      fetchVideos();
    }
  }, [user, loading]);

  const checkAdminAccess = async () => {
    if (!user || user.role !== 'admin') {
      window.location.href = '/members';
      return;
    }
  };

  const fetchVideos = async () => {
    try {
      const { data, error } = await supabase
        .from('videos')
        .select('*')
        .order('created_at', { ascending: false });

      if (error) throw error;
      setVideos(data || []);
    } catch (err) {
      console.error('Error fetching videos:', err);
      setError('Failed to load videos');
    } finally {
      setLoadingVideos(false);
    }
  };

  const handleFileUpload = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (!file) return;

    setUploading(true);
    setError(null);

    try {
      // Upload file to Supabase Storage
      const fileName = `${Date.now()}-${file.name}`;
      const { data: uploadData, error: uploadError } = await supabase.storage
        .from('videos')
        .upload(fileName, file);

      if (uploadError) throw uploadError;

      // Create video record in database
      const { data: videoData, error: videoError } = await supabase
        .from('videos')
        .insert({
          title: file.name.replace(/\.[^/.]+$/, ''), // Remove file extension
          storage_path: uploadData.path,
          created_by: user?.id,
          is_published: false,
        })
        .select()
        .single();

      if (videoError) throw videoError;

      // Log admin action
      await supabase
        .from('video_audit')
        .insert({
          admin_id: user?.id,
          action_type: 'upload',
          video_id: videoData.id,
          details: { fileName: file.name, fileSize: file.size },
        });

      setVideos([videoData, ...videos]);
    } catch (err) {
      console.error('Error uploading video:', err);
      setError('Failed to upload video');
    } finally {
      setUploading(false);
    }
  };

  const togglePublished = async (video: Video) => {
    try {
      const newStatus = !video.is_published;
      
      const { error } = await supabase
        .from('videos')
        .update({ is_published: newStatus })
        .eq('id', video.id);

      if (error) throw error;

      // Log admin action
      await supabase
        .from('video_audit')
        .insert({
          admin_id: user?.id,
          action_type: newStatus ? 'publish' : 'unpublish',
          video_id: video.id,
        });

      setVideos(videos.map(v => 
        v.id === video.id ? { ...v, is_published: newStatus } : v
      ));
    } catch (err) {
      console.error('Error updating video:', err);
      setError('Failed to update video');
    }
  };

  const deleteVideo = async (video: Video) => {
    if (!confirm('Are you sure you want to delete this video?')) return;

    try {
      // Delete from storage
      const { error: storageError } = await supabase.storage
        .from('videos')
        .remove([video.storage_path]);

      if (storageError) throw storageError;

      // Delete from database
      const { error: dbError } = await supabase
        .from('videos')
        .delete()
        .eq('id', video.id);

      if (dbError) throw dbError;

      // Log admin action
      await supabase
        .from('video_audit')
        .insert({
          admin_id: user?.id,
          action_type: 'delete',
          video_id: video.id,
          details: { title: video.title },
        });

      setVideos(videos.filter(v => v.id !== video.id));
    } catch (err) {
      console.error('Error deleting video:', err);
      setError('Failed to delete video');
    }
  };

  if (loading || loadingVideos) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
        <div className="text-center">
          <Loader2 className="animate-spin mx-auto mb-4 text-rose-gold-500" size={48} />
          <p className="text-warm-bronze-600">Loading admin panel...</p>
        </div>
      </div>
    );
  }

  if (!user || user.role !== 'admin') {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
        <div className="text-center">
          <h1 className="text-2xl font-bold text-warm-bronze-900 mb-4">Access Denied</h1>
          <p className="text-warm-bronze-600">You don't have permission to access this page.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-soft-pink-50 to-rose-gold-50">
      <header className="bg-white/80 backdrop-blur-sm shadow-sm border-b border-soft-shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold text-warm-bronze-900">
              Admin Panel - Video Management
            </h1>
            <div className="text-sm text-warm-bronze-600">
              Welcome, <span className="font-medium text-rose-gold-600">{user.email}</span>
            </div>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {error && (
          <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
            <p className="text-red-700">{error}</p>
          </div>
        )}

        {/* Upload Section */}
        <div className="card-gradient rounded-xl shadow-lg p-6 mb-8">
          <h2 className="text-xl font-semibold text-warm-bronze-900 mb-4">Upload New Video</h2>
          <div className="flex items-center space-x-4">
            <label className="btn-primary cursor-pointer flex items-center">
              <input
                type="file"
                accept="video/*"
                onChange={handleFileUpload}
                disabled={uploading}
                className="hidden"
              />
              {uploading ? (
                <>
                  <Loader2 className="animate-spin mr-2" size={20} />
                  Uploading...
                </>
              ) : (
                <>
                  <Upload className="mr-2" size={20} />
                  Choose Video File
                </>
              )}
            </label>
            <p className="text-warm-bronze-600 text-sm">
              Supported formats: MP4, MOV, AVI (Max 500MB)
            </p>
          </div>
        </div>

        {/* Videos List */}
        <div className="card-gradient rounded-xl shadow-lg p-6">
          <h2 className="text-xl font-semibold text-warm-bronze-900 mb-6">
            Video Library ({videos.length} videos)
          </h2>
          
          {videos.length === 0 ? (
            <div className="text-center py-12">
              <Plus className="mx-auto mb-4 text-warm-bronze-400" size={48} />
              <h3 className="text-lg font-medium text-warm-bronze-900 mb-2">No Videos Yet</h3>
              <p className="text-warm-bronze-600">Upload your first video to get started.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {videos.map((video) => (
                <div
                  key={video.id}
                  className="bg-white rounded-lg p-4 border border-soft-shadow hover:border-rose-gold-300 transition-colors"
                >
                  <div className="flex items-center justify-between">
                    <div className="flex-1">
                      <h3 className="font-medium text-warm-bronze-900 mb-1">
                        {video.title}
                      </h3>
                      <p className="text-warm-bronze-600 text-sm">
                        Uploaded: {new Date(video.created_at).toLocaleDateString()}
                      </p>
                      {video.description && (
                        <p className="text-warm-bronze-600 text-sm mt-1">
                          {video.description}
                        </p>
                      )}
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${
                        video.is_published
                          ? 'bg-green-100 text-green-700'
                          : 'bg-yellow-100 text-yellow-700'
                      }`}>
                        {video.is_published ? 'Published' : 'Draft'}
                      </span>
                      
                      <button
                        onClick={() => togglePublished(video)}
                        className="p-2 hover:bg-soft-pink-50 rounded-lg transition-colors"
                        title={video.is_published ? 'Unpublish' : 'Publish'}
                      >
                        {video.is_published ? (
                          <EyeOff className="text-warm-bronze-600" size={18} />
                        ) : (
                          <Eye className="text-rose-gold-500" size={18} />
                        )}
                      </button>
                      
                      <button
                        onClick={() => deleteVideo(video)}
                        className="p-2 hover:bg-red-50 rounded-lg transition-colors"
                        title="Delete video"
                      >
                        <Trash2 className="text-red-500" size={18} />
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}