import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Sequelize, DataTypes } from 'sequelize';

const supabaseUrl = import.meta.env.VITE_SUPABASE_PROJECT_URL;
const supabaseKey = import.meta.env.VITE_SUPABASE_API_KEY;
export const supabase = createClient(supabaseUrl, supabaseKey);

import React from "react";
export const queryClient = new QueryClient();
export function SupabaseProvider({ children }) {
    return React.createElement(QueryClientProvider, { client: queryClient }, children);
}

const fromSupabase = async (query) => {
    const { data, error } = await query;
    if (error) throw new Error(error.message);
    return data;
};

// Initialize Sequelize
const sequelize = new Sequelize(import.meta.env.VITE_DATABASE_URL, {
    dialect: 'postgres',
    protocol: 'postgres',
    logging: false,
});

// Define models
const User = sequelize.define('User', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    username: { type: DataTypes.STRING, allowNull: false },
    group_id: { type: DataTypes.UUID, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
    email: { type: DataTypes.STRING, allowNull: false },
    password_hash: { type: DataTypes.STRING, allowNull: false },
    first_name: { type: DataTypes.STRING, allowNull: true },
    last_name: { type: DataTypes.STRING, allowNull: true },
});

const Task = sequelize.define('Task', {
    task_id: { type: DataTypes.UUID, primaryKey: true },
    user_id: { type: DataTypes.UUID, allowNull: false },
    title: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    category_id: { type: DataTypes.UUID, allowNull: true },
    priority: { type: DataTypes.STRING, allowNull: true },
    status: { type: DataTypes.STRING, allowNull: true },
    due_date: { type: DataTypes.DATE, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
});

const File = sequelize.define('File', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    file_id: { type: DataTypes.UUID, allowNull: true },
    uploader_id: { type: DataTypes.UUID, allowNull: false },
    file_name: { type: DataTypes.TEXT, allowNull: false },
    file_type: { type: DataTypes.TEXT, allowNull: true },
    file_size: { type: DataTypes.INTEGER, allowNull: true },
    upload_date: { type: DataTypes.DATE, allowNull: true },
    version: { type: DataTypes.INTEGER, allowNull: true },
    is_active: { type: DataTypes.BOOLEAN, allowNull: true },
    group_id: { type: DataTypes.UUID, allowNull: true },
});

const ContextualRelation = sequelize.define('ContextualRelation', {
    // Define fields as per your requirements
});

const EntanglementNode = sequelize.define('EntanglementNode', {
    // Define fields as per your requirements
});

const Comment = sequelize.define('Comment', {
    comment_id: { type: DataTypes.UUID, primaryKey: true },
    task_id: { type: DataTypes.UUID, allowNull: false },
    user_id: { type: DataTypes.UUID, allowNull: false },
    content: { type: DataTypes.TEXT, allowNull: false },
    created_at: { type: DataTypes.DATE, allowNull: true },
});

const Group = sequelize.define('Group', {
    id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
    group_id: { type: DataTypes.UUID, allowNull: true },
    group_name: { type: DataTypes.STRING, allowNull: false },
    description: { type: DataTypes.TEXT, allowNull: true },
    created_at: { type: DataTypes.DATE, allowNull: true },
    updated_at: { type: DataTypes.DATE, allowNull: true },
});

export { User, Task, File, ContextualRelation, EntanglementNode, Comment, Group };

export const useTags = () => useQuery({
    queryKey: ['tags'],
    queryFn: () => fromSupabase(supabase.from('tags').select('*')),
});

export const useAddTag = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTag) => fromSupabase(supabase.from('tags').insert([newTag])),
        onSuccess: () => {
            queryClient.invalidateQueries('tags');
        },
    });
};

export const useTasks = () => useQuery({
    queryKey: ['tasks'],
    queryFn: () => fromSupabase(supabase.from('tasks').select('*')),
});

export const useAddTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newTask) => fromSupabase(supabase.from('tasks').insert([newTask])),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUpdateTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedTask) => fromSupabase(supabase.from('tasks').update(updatedTask).eq('task_id', updatedTask.task_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useDeleteTask = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (taskId) => fromSupabase(supabase.from('tasks').delete().eq('task_id', taskId)),
        onSuccess: () => {
            queryClient.invalidateQueries('tasks');
        },
    });
};

export const useUserScores = () => useQuery({
    queryKey: ['user_scores'],
    queryFn: () => fromSupabase(supabase.from('user_scores').select('*')),
});

export const useAddUserScore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUserScore) => fromSupabase(supabase.from('user_scores').insert([newUserScore])),
        onSuccess: () => {
            queryClient.invalidateQueries('user_scores');
        },
    });
};

export const useUpdateUserScore = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (updatedUserScore) => fromSupabase(supabase.from('user_scores').update(updatedUserScore).eq('user_id', updatedUserScore.user_id)),
        onSuccess: () => {
            queryClient.invalidateQueries('user_scores');
        },
    });
};

export const useAddUser = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newUser) => fromSupabase(supabase.from('users').insert([newUser])),
        onSuccess: () => {
            queryClient.invalidateQueries('users');
        },
    });
};

export const useVotes = () => useQuery({
    queryKey: ['votes'],
    queryFn: () => fromSupabase(supabase.from('votes').select('*')),
});

export const useAddVote = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newVote) => fromSupabase(supabase.from('votes').insert([newVote])),
        onSuccess: () => {
            queryClient.invalidateQueries('votes');
        },
    });
};

export const useAddProject = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newProject) => fromSupabase(supabase.from('projects').insert([newProject])),
        onSuccess: () => {
            queryClient.invalidateQueries('projects');
        },
    });
};

export const useAddFile = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newFile) => fromSupabase(supabase.from('files').insert([newFile])),
        onSuccess: () => {
            queryClient.invalidateQueries('files');
        },
    });
};

export const useComments = () => useQuery({
    queryKey: ['comments'],
    queryFn: () => fromSupabase(supabase.from('comments').select('*')),
});

export const useAddComment = () => {
    const queryClient = useQueryClient();
    return useMutation({
        mutationFn: (newComment) => fromSupabase(supabase.from('comments').insert([newComment])),
        onSuccess: () => {
            queryClient.invalidateQueries('comments');
        },
    });
};