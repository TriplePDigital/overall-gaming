import { ApiError, UserCredentials } from '@supabase/supabase-js';
import { useState } from 'react';
import { supabase } from '../utils/supabaseClient';
import { LoginError, LoginReturn } from '../types/types';

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (email: string):Promise<any> => {
    try {
      setLoading(true);
      const { error } = await supabase.auth.signIn({ email });
      if (error) throw error;
      alert('Check your email for the login link!');
    } catch (error) {
      throw new Error(error.message);
    } finally {
      setLoading(false);
    }
  };

  const signInWithDiscord = async () => {
    const { user, session, error } = await supabase.auth.signIn({
      provider: 'discord',
    });
    if (error) {
      throw new Error(error.message);
    }
  };

  return (
    <div className="flex-col flex flex-center">
      <div className="col-6 form-widget">
        <p className="description">Sign in via magic link</p>
        <div>
          <input
            className="inputField"
            type="email"
            placeholder="Your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              handleLogin(email);
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Send magic link'}</span>
          </button>
        </div>
      </div>
      <div className="col-6 form-widget">
        <p className="description">Sign in via Discord</p>
        <div>
          <button
            onClick={(e) => {
              e.preventDefault();
              signInWithDiscord();
            }}
            className="button block"
            disabled={loading}
          >
            <span>{loading ? 'Loading' : 'Login using Discord'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
