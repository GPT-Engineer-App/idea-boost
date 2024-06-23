import { createClient } from '@supabase/supabase-js';
import { useQuery, useMutation, useQueryClient, QueryClient, QueryClientProvider } from '@tanstack/react-query';

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

/* supabase integration types

### groups

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| group_id   | uuid        | string | false    |
| group_name | varchar     | string | true     |
| description| text        | string | false    |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### tasks

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| task_id     | uuid        | string | true     |
| user_id     | uuid        | string | true     |
| title       | varchar     | string | true     |
| description | text        | string | false    |
| category_id | uuid        | string | false    |
| priority    | varchar     | string | false    |
| status      | varchar     | string | false    |
| due_date    | timestamp   | string | false    |
| created_at  | timestamp   | string | false    |
| updated_at  | timestamp   | string | false    |

### profiles

| name       | type        | format | required |
|------------|-------------|--------|----------|
| profile_id | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| bio        | text        | string | false    |
| avatar_url | varchar     | string | false    |
| created_at | timestamp   | string | false    |
| updated_at | timestamp   | string | false    |

### task_tags

| name   | type | format | required |
|--------|------|--------|----------|
| task_id| uuid | string | true     |
| tag_id | uuid | string | true     |

### projects

| name        | type        | format | required |
|-------------|-------------|--------|----------|
| id          | int8        | number | true     |
| project_id  | uuid        | string | false    |
| project_name| varchar     | string | true     |
| description | text        | string | false    |
| start_date  | timestamptz | string | false    |
| end_date    | timestamptz | string | false    |

### files

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| file_id    | uuid        | string | false    |
| uploader_id| uuid        | string | true     |
| file_name  | text        | string | true     |
| file_type  | text        | string | false    |
| file_size  | int8        | number | false    |
| upload_date| timestamptz | string | false    |
| version    | int4        | number | false    |
| is_active  | bool        | boolean| false    |
| group_id   | uuid        | string | false    |

### user_scores

| name       | type        | format | required |
|------------|-------------|--------|----------|
| id         | int8        | number | true     |
| user_id    | uuid        | string | true     |
| score      | int4        | number | true     |
| created_at | timestamptz | string | false    |
| updated_at | timestamptz | string | false    |

### comments

| name       | type        | format | required |
|------------|-------------|--------|----------|
| comment_id | uuid        | string | true     |
| task_id    | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| content    | text        | string | true     |
| created_at | timestamp   | string | false    |

### tags

| name       | type        | format | required |
|------------|-------------|--------|----------|
| tag_id     | uuid        | string | true     |
| name       | varchar     | string | true     |

### users

| name          | type        | format | required |
|---------------|-------------|--------|----------|
| id            | int8        | number | true     |
| user_id       | uuid        | string | false    |
| username      | varchar     | string | true     |
| group_id      | uuid        | string | false    |
| created_at    | timestamptz | string | false    |
| updated_at    | timestamptz | string | false    |
| email         | varchar     | string | true     |
| password_hash | varchar     | string | true     |
| first_name    | varchar     | string | false    |
| last_name     | varchar     | string | false    |

### sessions

| name       | type        | format | required |
|------------|-------------|--------|----------|
| session_id | uuid        | string | true     |
| user_id    | uuid        | string | true     |
| token      | varchar     | string | true     |
| created_at | timestamp   | string | false    |
| expires_at | timestamp   | string | false    |

### categories

| name       | type        | format | required |
|------------|-------------|--------|----------|
| category_id| uuid        | string | true     |
| name       | varchar     | string | true     |

*/

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