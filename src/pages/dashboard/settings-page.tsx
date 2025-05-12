import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { Bell, Mail, Lock, User, Shield, Moon, Sun } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";
import { useAuth } from "@/hooks/use-auth";
import { useTheme } from "@/hooks/use-theme";

type UserProfileFormValues = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  newPassword: string;
  confirmPassword: string;
};

type ThemeOption = {
  value: "light" | "dark" | "system";
  label: string;
  icon: React.ReactNode;
}

const themeOptions: ThemeOption[] = [
  {
    value: "light",
    label: "Light",
    icon: <Sun className="h-5 w-5" />,
  },
  {
    value: "dark",
    label: "Dark",
    icon: <Moon className="h-5 w-5" />,
  },
  {
    value: "system",
    label: "System",
    icon: <span className="flex">
      <Sun className="h-5 w-5" />
      <Moon className="h-5 w-5 ml-1" />
    </span>,
  },
];

export default function SettingsPage() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [activeTab, setActiveTab] = useState("profile");
  const [notifications, setNotifications] = useState({
    email: true,
    push: true,
    marketing: false,
    updates: true,
  });
  
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<UserProfileFormValues>({
    defaultValues: {
      firstName: user?.first_name || "",
      lastName: user?.last_name || "",
      email: user?.email || "",
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmit = async (data: UserProfileFormValues) => {
    // This would connect to your API/Supabase to update user profile
    console.log("Updating profile:", data);
  };

  const toggleNotification = (key: string) => {
    setNotifications({
      ...notifications,
      [key]: !notifications[key as keyof typeof notifications],
    });
  };

  // Update page title
  useEffect(() => {
    document.title = "Account Settings - SaaSApp";
  }, []);

  return (
    <div className="space-y-6 p-6">
      <div className="flex flex-col space-y-6 md:flex-row md:space-x-8 md:space-y-0">
        <aside className="md:w-1/4">
          <Card>
            <CardContent className="p-4">
              <nav className="flex flex-col space-y-1">
                <Button
                  variant={activeTab === "profile" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("profile")}
                >
                  <User className="mr-2 h-4 w-4" />
                  Profile
                </Button>
                <Button
                  variant={activeTab === "account" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("account")}
                >
                  <Mail className="mr-2 h-4 w-4" />
                  Account
                </Button>
                <Button
                  variant={activeTab === "password" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("password")}
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Password
                </Button>
                <Button
                  variant={activeTab === "notifications" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("notifications")}
                >
                  <Bell className="mr-2 h-4 w-4" />
                  Notifications
                </Button>
                <Button
                  variant={activeTab === "appearance" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("appearance")}
                >
                  <Moon className="mr-2 h-4 w-4" />
                  Appearance
                </Button>
                <Button
                  variant={activeTab === "security" ? "default" : "ghost"}
                  className="justify-start"
                  onClick={() => setActiveTab("security")}
                >
                  <Shield className="mr-2 h-4 w-4" />
                  Security
                </Button>
              </nav>
            </CardContent>
          </Card>
        </aside>

        <div className="flex-1 md:max-w-3xl">
          {activeTab === "profile" && (
            <Card>
              <CardHeader>
                <CardTitle>Profile Settings</CardTitle>
                <CardDescription>
                  Update your personal information and how others see you on the platform.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="flex flex-col gap-4 md:flex-row">
                    <div className="flex items-center justify-center">
                      <Avatar 
                        src={user?.avatar_url} 
                        alt={user?.email || "User"}
                        size="lg"
                        className="h-24 w-24"
                      />
                    </div>
                    <div className="flex flex-1 flex-col justify-center space-y-1">
                      <h3 className="text-lg font-medium">Profile Picture</h3>
                      <p className="text-sm text-muted-foreground">
                        Upload a new avatar or profile picture.
                      </p>
                      <div className="mt-2 flex space-x-2">
                        <Button variant="outline" size="sm">
                          Upload
                        </Button>
                        <Button variant="outline" size="sm" className="text-destructive">
                          Remove
                        </Button>
                      </div>
                    </div>
                  </div>

                  <div className="grid gap-4 md:grid-cols-2">
                    <div className="space-y-2">
                      <label htmlFor="firstName" className="text-sm font-medium">
                        First Name
                      </label>
                      <Input
                        id="firstName"
                        {...register("firstName", { required: "First name is required" })}
                      />
                      {errors.firstName && (
                        <p className="text-xs text-destructive">{errors.firstName.message}</p>
                      )}
                    </div>
                    <div className="space-y-2">
                      <label htmlFor="lastName" className="text-sm font-medium">
                        Last Name
                      </label>
                      <Input
                        id="lastName"
                        {...register("lastName", { required: "Last name is required" })}
                      />
                      {errors.lastName && (
                        <p className="text-xs text-destructive">{errors.lastName.message}</p>
                      )}
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">
                      Email
                    </label>
                    <Input
                      id="email"
                      type="email"
                      disabled
                      {...register("email")}
                    />
                    <p className="text-xs text-muted-foreground">
                      Your email address is used for signing in and cannot be changed.
                    </p>
                  </div>

                  <Button type="submit">Update Profile</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "password" && (
            <Card>
              <CardHeader>
                <CardTitle>Password Settings</CardTitle>
                <CardDescription>
                  Update your password to secure your account.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
                  <div className="space-y-2">
                    <label htmlFor="password" className="text-sm font-medium">
                      Current Password
                    </label>
                    <Input
                      id="password"
                      type="password"
                      {...register("password", { required: "Current password is required" })}
                    />
                    {errors.password && (
                      <p className="text-xs text-destructive">{errors.password.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="newPassword" className="text-sm font-medium">
                      New Password
                    </label>
                    <Input
                      id="newPassword"
                      type="password"
                      {...register("newPassword", { 
                        required: "New password is required",
                        minLength: {
                          value: 8,
                          message: "Password must be at least 8 characters"
                        }
                      })}
                    />
                    {errors.newPassword && (
                      <p className="text-xs text-destructive">{errors.newPassword.message}</p>
                    )}
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="confirmPassword" className="text-sm font-medium">
                      Confirm New Password
                    </label>
                    <Input
                      id="confirmPassword"
                      type="password"
                      {...register("confirmPassword", {
                        required: "Please confirm your new password",
                        validate: (value) =>
                          value === (document.getElementById("newPassword") as HTMLInputElement)?.value ||
                          "The passwords do not match"
                      })}
                    />
                    {errors.confirmPassword && (
                      <p className="text-xs text-destructive">{errors.confirmPassword.message}</p>
                    )}
                  </div>
                  <Button type="submit">Update Password</Button>
                </form>
              </CardContent>
            </Card>
          )}

          {activeTab === "notifications" && (
            <Card>
              <CardHeader>
                <CardTitle>Notification Settings</CardTitle>
                <CardDescription>
                  Manage how you receive notifications and updates.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Email Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications via email.
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications.email}
                        onClick={() => toggleNotification("email")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          notifications.email ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span className="sr-only">Toggle email notifications</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.email ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Push Notifications</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications on your device.
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications.push}
                        onClick={() => toggleNotification("push")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          notifications.push ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span className="sr-only">Toggle push notifications</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.push ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Marketing Emails</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive emails about new features and offers.
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications.marketing}
                        onClick={() => toggleNotification("marketing")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          notifications.marketing ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span className="sr-only">Toggle marketing emails</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.marketing ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Product Updates</h3>
                      <p className="text-sm text-muted-foreground">
                        Receive notifications about product updates.
                      </p>
                    </div>
                    <div>
                      <button
                        type="button"
                        role="switch"
                        aria-checked={notifications.updates}
                        onClick={() => toggleNotification("updates")}
                        className={`relative inline-flex h-6 w-11 items-center rounded-full ${
                          notifications.updates ? "bg-primary" : "bg-muted"
                        }`}
                      >
                        <span className="sr-only">Toggle product updates</span>
                        <span
                          className={`inline-block h-4 w-4 transform rounded-full bg-white transition ${
                            notifications.updates ? "translate-x-6" : "translate-x-1"
                          }`}
                        ></span>
                      </button>
                    </div>
                  </div>
                </div>
                <Button>Save Notification Settings</Button>
              </CardContent>
            </Card>
          )}

          {activeTab === "appearance" && (
            <Card>
              <CardHeader>
                <CardTitle>Appearance Settings</CardTitle>
                <CardDescription>
                  Customize how the application looks on your device.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div>
                  <h3 className="mb-4 font-medium">Theme</h3>
                  <div className="grid grid-cols-3 gap-4">
                    {themeOptions.map((option) => (
                      <div key={option.value}>
                        <button
                          onClick={() => setTheme(option.value)}
                          className={`w-full rounded-lg border border-border p-4 text-center ${
                            theme === option.value
                              ? "border-primary bg-primary/5"
                              : "bg-card hover:bg-muted"
                          }`}
                        >
                          <div className="flex flex-col items-center gap-2">
                            {option.icon}
                            <span>{option.label}</span>
                          </div>
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "security" && (
            <Card>
              <CardHeader>
                <CardTitle>Security Settings</CardTitle>
                <CardDescription>
                  Manage your account security and login options.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Two-Factor Authentication</h3>
                      <p className="text-sm text-muted-foreground">
                        Add an extra layer of security to your account.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Enable
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Active Sessions</h3>
                      <p className="text-sm text-muted-foreground">
                        Manage devices where you're currently logged in.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      Manage
                    </Button>
                  </div>
                  
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">Account Activity</h3>
                      <p className="text-sm text-muted-foreground">
                        View recent account activity and security events.
                      </p>
                    </div>
                    <Button variant="outline" size="sm">
                      View Log
                    </Button>
                  </div>
                </div>
                
                <div className="rounded-md bg-destructive/10 p-4">
                  <h3 className="font-medium text-destructive">Danger Zone</h3>
                  <p className="mt-1 text-sm">
                    Once you delete your account, there is no going back. This action cannot be undone.
                  </p>
                  <Button variant="destructive" size="sm" className="mt-4">
                    Delete Account
                  </Button>
                </div>
              </CardContent>
            </Card>
          )}

          {activeTab === "account" && (
            <Card>
              <CardHeader>
                <CardTitle>Account Settings</CardTitle>
                <CardDescription>
                  Manage your account preferences and information.
                </CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="space-y-2">
                  <h3 className="font-medium">Account Type</h3>
                  <p className="text-sm">Personal Account</p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Account Status</h3>
                  <p className="inline-flex rounded-full bg-success/20 px-2 py-1 text-xs text-success">
                    Active
                  </p>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Language Preference</h3>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="en-US">English (US)</option>
                    <option value="en-GB">English (UK)</option>
                    <option value="fr">French</option>
                    <option value="de">German</option>
                    <option value="es">Spanish</option>
                  </select>
                </div>
                
                <div className="space-y-2">
                  <h3 className="font-medium">Timezone</h3>
                  <select className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm">
                    <option value="UTC-8">Pacific Time (UTC-8)</option>
                    <option value="UTC-5">Eastern Time (UTC-5)</option>
                    <option value="UTC+0">Coordinated Universal Time (UTC)</option>
                    <option value="UTC+1">Central European Time (UTC+1)</option>
                    <option value="UTC+8">China Standard Time (UTC+8)</option>
                  </select>
                </div>
                
                <Button>Save Account Settings</Button>
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
}