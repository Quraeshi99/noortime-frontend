// Mock Supabase for local testing
export const supabase = {
  auth: {
    getSession: async () => {
      const user = localStorage.getItem('mockUser');
      return { 
        data: { 
          session: user ? { user: JSON.parse(user) } : null 
        } 
      };
    },
    
    onAuthStateChange: (callback: any) => {
      // Mock auth state listener
      const user = localStorage.getItem('mockUser');
      setTimeout(() => {
        callback('SIGNED_IN', { user: user ? JSON.parse(user) : null });
      }, 100);
      
      return {
        data: {
          subscription: {
            unsubscribe: () => {}
          }
        }
      };
    },
    
    signInWithPassword: async ({ email, password }: { email: string; password: string }) => {
      // Mock users for testing
      const mockUsers = [
        { 
          id: '1', 
          email: 'test@test.com', 
          password: '123456',
          user_metadata: { full_name: 'Test User' }
        },
        { 
          id: '2', 
          email: 'admin@admin.com', 
          password: 'admin123',
          user_metadata: { full_name: 'Admin User' }
        }
      ];
      
      const user = mockUsers.find(u => u.email === email && u.password === password);
      
      if (user) {
        const { password: _, ...userWithoutPassword } = user;
        localStorage.setItem('mockUser', JSON.stringify(userWithoutPassword));
        return { 
          data: { user: userWithoutPassword }, 
          error: null 
        };
      } else {
        return { 
          data: null, 
          error: { message: 'Invalid email or password' } 
        };
      }
    },
    
    signUp: async ({ email, password, options }: any) => {
      // Mock signup - simulate successful registration
      const newUser = {
        id: Date.now().toString(),
        email,
        user_metadata: { 
          full_name: options?.data?.full_name || 'New User' 
        }
      };
      
      localStorage.setItem('mockUser', JSON.stringify(newUser));
      return { 
        data: { user: newUser }, 
        error: null 
      };
    },
    
    signOut: async () => {
      localStorage.removeItem('mockUser');
      return { error: null };
    },
    
    updateUser: async ({ email, data }: any) => {
      const currentUser = localStorage.getItem('mockUser');
      if (currentUser) {
        const user = JSON.parse(currentUser);
        const updatedUser = {
          ...user,
          email: email || user.email,
          user_metadata: { ...user.user_metadata, ...data }
        };
        localStorage.setItem('mockUser', JSON.stringify(updatedUser));
        return { data: { user: updatedUser }, error: null };
      }
      return { data: null, error: { message: 'No user found' } };
    },
    
    resetPasswordForEmail: async (email: string) => {
      // Mock password reset
      return { data: {}, error: null };
    }
  }
};