import { useState, useEffect } from "react";
import { User } from "@supabase/supabase-js";
import { supabase } from "@/integrations/supabase/client";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";
import { DynamicBackground } from "@/components/DynamicBackground";
import { useToast } from "@/hooks/use-toast";
import { ArrowLeft, Shield, Bell, Globe, Trash2, Download, Mail } from "lucide-react";
import { Link } from "react-router-dom";

const Settings = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [settings, setSettings] = useState({
    notifications: true,
    marketing_emails: false,
    quantum_alerts: true,
    data_sharing: false,
  });
  const { toast } = useToast();

  useEffect(() => {
    getCurrentUser();
  }, []);

  const getCurrentUser = async () => {
    try {
      const { data: { user } } = await supabase.auth.getUser();
      setUser(user);
    } catch (error: any) {
      console.error('Error fetching user:', error);
      toast({
        title: "Error",
        description: "Failed to load user data",
        variant: "destructive",
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSettingChange = (setting: string, value: boolean) => {
    setSettings(prev => ({ ...prev, [setting]: value }));
    // In a real app, you would save this to the database
    toast({
      title: "Setting updated",
      description: `${setting.replace('_', ' ')} has been ${value ? 'enabled' : 'disabled'}`,
    });
  };

  const handleExportData = () => {
    toast({
      title: "Data export initiated",
      description: "You will receive an email with your data export within 24 hours",
    });
  };

  const handleDeleteAccount = () => {
    toast({
      title: "Account deletion",
      description: "Please contact support to delete your account",
      variant: "destructive",
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <DynamicBackground />
        <div className="relative z-10 text-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading settings...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return (
      <div className="min-h-screen bg-gradient-background flex items-center justify-center">
        <DynamicBackground />
        <div className="relative z-10 text-center">
          <p className="text-muted-foreground">Settings not found</p>
          <Link to="/dashboard">
            <Button className="mt-4">Return to Dashboard</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-background">
      <DynamicBackground />
      
      {/* Header */}
      <div className="relative z-10 border-b border-glass">
        <div className="container mx-auto px-4 py-4 flex items-center space-x-4">
          <Link to="/dashboard">
            <Button variant="ghost" size="sm">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Dashboard
            </Button>
          </Link>
          <h1 className="text-2xl font-bold bg-gradient-quantum bg-clip-text text-transparent">
            Account Settings
          </h1>
        </div>
      </div>

      {/* Main Content */}
      <div className="relative z-10 container mx-auto px-4 py-8 max-w-4xl">
        <div className="grid gap-8">
          {/* Account Information */}
          <Card className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="h-5 w-5 text-accent-cyan" />
                Account Information
              </CardTitle>
              <CardDescription>
                Your account details and authentication information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <Label className="text-sm font-medium">Email Address</Label>
                  <p className="text-sm text-muted-foreground">{user.email}</p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Account Status</Label>
                  <Badge variant="secondary" className="bg-green-500/20 text-green-300">
                    Active
                  </Badge>
                </div>
                <div>
                  <Label className="text-sm font-medium">Account Created</Label>
                  <p className="text-sm text-muted-foreground">
                    {new Date(user.created_at).toLocaleDateString()}
                  </p>
                </div>
                <div>
                  <Label className="text-sm font-medium">Last Sign In</Label>
                  <p className="text-sm text-muted-foreground">
                    {user.last_sign_in_at ? new Date(user.last_sign_in_at).toLocaleDateString() : 'Never'}
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Notification Preferences */}
          <Card className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Bell className="h-5 w-5 text-accent-neon" />
                Notification Preferences
              </CardTitle>
              <CardDescription>
                Manage how you receive updates and alerts
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Email Notifications</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive important updates via email
                  </p>
                </div>
                <Switch
                  checked={settings.notifications}
                  onCheckedChange={(value) => handleSettingChange('notifications', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Marketing Emails</Label>
                  <p className="text-sm text-muted-foreground">
                    Receive newsletters and product updates
                  </p>
                </div>
                <Switch
                  checked={settings.marketing_emails}
                  onCheckedChange={(value) => handleSettingChange('marketing_emails', value)}
                />
              </div>
              
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Quantum Processing Alerts</Label>
                  <p className="text-sm text-muted-foreground">
                    Get notified when quantum jobs complete
                  </p>
                </div>
                <Switch
                  checked={settings.quantum_alerts}
                  onCheckedChange={(value) => handleSettingChange('quantum_alerts', value)}
                />
              </div>
            </CardContent>
          </Card>

          {/* Privacy & Security */}
          <Card className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Globe className="h-5 w-5 text-primary" />
                Privacy & Security
              </CardTitle>
              <CardDescription>
                Control your privacy and data sharing preferences
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-0.5">
                  <Label className="text-base">Anonymous Usage Analytics</Label>
                  <p className="text-sm text-muted-foreground">
                    Help improve our services with anonymous data
                  </p>
                </div>
                <Switch
                  checked={settings.data_sharing}
                  onCheckedChange={(value) => handleSettingChange('data_sharing', value)}
                />
              </div>
              
              <div className="pt-4 border-t border-glass">
                <div className="flex items-center justify-between">
                  <div className="space-y-0.5">
                    <Label className="text-base">Two-Factor Authentication</Label>
                    <p className="text-sm text-muted-foreground">
                      Add an extra layer of security to your account
                    </p>
                  </div>
                  <Button variant="outline" size="sm">
                    Configure
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Data Management */}
          <Card className="bg-glass backdrop-blur-xl border-glass shadow-elegant">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Download className="h-5 w-5 text-accent-cyan" />
                Data Management
              </CardTitle>
              <CardDescription>
                Export or delete your account data
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between p-4 border border-glass rounded-lg">
                <div className="space-y-0.5">
                  <Label className="text-base">Export Account Data</Label>
                  <p className="text-sm text-muted-foreground">
                    Download all your account information and activity
                  </p>
                </div>
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  className="bg-secondary/50 border-glass backdrop-blur-sm hover:bg-secondary/70"
                >
                  <Mail className="h-4 w-4 mr-2" />
                  Request Export
                </Button>
              </div>
              
              <div className="flex items-center justify-between p-4 border border-destructive/20 rounded-lg bg-destructive/5">
                <div className="space-y-0.5">
                  <Label className="text-base text-destructive">Delete Account</Label>
                  <p className="text-sm text-muted-foreground">
                    Permanently delete your account and all associated data
                  </p>
                </div>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  className="bg-destructive/20 border-destructive/40 hover:bg-destructive/30"
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Delete Account
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
};

export default Settings;