import React, { useState } from 'react';
import { useAuth } from '@/context/AuthContext';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle
} from '@/components/ui/card';
import { Eye, EyeOff, Loader2 } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

export const Login = () => {
  const { login } = useAuth();
  const [formData, setFormData] = useState({ email: '', password: '' });
  const [error, setError] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsSubmitting(true);

    try {
      await new Promise((resolve) => setTimeout(resolve, 1200));

      const fakeToken = "jwt-access-token-example";
      const fakeUser = {
        id: "u-secure-1",
        email: formData.email,
        name: formData.email.split("@")[0],
        role: "user"
      };

      login(fakeToken, fakeUser);
      navigate('/');
    } catch (err) {
      setError(err.message || 'Invalid email or password. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-[#0E1733]/5">
      <Card className="w-full max-w-md border-none shadow-xl rounded-2xl overflow-hidden">

        {/* Header */}
        <CardHeader className="text-center space-y-1 bg-[#0E1733] text-white py-8">
          <CardTitle className="text-2xl font-bold">
            Welcome Back
          </CardTitle>
          <CardDescription className="text-gray-300">
            Sign in to continue shopping at Wa-Morgan
          </CardDescription>
        </CardHeader>

        {/* Form */}
        <form onSubmit={handleSubmit}>
          <CardContent className="grid gap-5 p-6">

            {error && (
              <div className="p-3 text-sm font-medium text-red-600 bg-red-50 rounded-md border border-red-200">
                {error}
              </div>
            )}

            {/* Email */}
            <div className="grid gap-2">
              <Label>Email address</Label>
              <Input
                name="email"
                type="email"
                placeholder="name@example.com"
                required
                value={formData.email}
                onChange={handleChange}
                disabled={isSubmitting}
                className="focus-visible:ring-[#F98603]"
              />
            </div>

            {/* Password */}
            <div className="grid gap-2">
              <div className="flex justify-between items-center">
                <Label>Password</Label>
                <a
                  href="#forgot"
                  className="text-xs text-[#F98603] hover:underline"
                >
                  Forgot password?
                </a>
              </div>

              <div className="relative">
                <Input
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  required
                  value={formData.password}
                  onChange={handleChange}
                  disabled={isSubmitting}
                  className="pr-10 focus-visible:ring-[#F98603]"
                />

                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-[#F98603]"
                >
                  {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                </button>
              </div>
            </div>

          </CardContent>

          {/* Footer */}
          <CardFooter className="flex flex-col gap-4 p-6 pt-0">

            <Button
              type="submit"
              className="w-full bg-[#F98603] hover:bg-[#ff9a1f] text-[#0E1733] font-semibold"
              disabled={isSubmitting}
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Signing In...
                </>
              ) : (
                "Sign In"
              )}
            </Button>

            <p className="text-sm text-center text-gray-500">
              Don&apos;t have an account?{" "}
              <a
                href="#register"
                className="text-[#F98603] font-medium hover:underline"
              >
                Sign up
              </a>
            </p>

          </CardFooter>
        </form>
      </Card>
    </div>
  );
};

export default Login;