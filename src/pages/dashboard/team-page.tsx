import { useEffect, useState } from "react";
import { UserPlus, Trash2, Mail, Briefcase } from "lucide-react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Avatar } from "@/components/ui/avatar";

// Mock data for team members
const initialTeamMembers = [
  {
    id: "1",
    name: "Alex Johnson",
    email: "alex@example.com",
    role: "Admin",
    avatar: "https://images.pexels.com/photos/220453/pexels-photo-220453.jpeg?auto=compress&cs=tinysrgb&w=150",
    dateAdded: "2023-05-15T00:00:00.000Z",
  },
  {
    id: "2",
    name: "Sarah Wilson",
    email: "sarah@example.com",
    role: "Member",
    avatar: "https://images.pexels.com/photos/415829/pexels-photo-415829.jpeg?auto=compress&cs=tinysrgb&w=150",
    dateAdded: "2023-06-02T00:00:00.000Z",
  },
  {
    id: "3",
    name: "Miguel Rodriguez",
    email: "miguel@example.com",
    role: "Member",
    avatar: "https://images.pexels.com/photos/614810/pexels-photo-614810.jpeg?auto=compress&cs=tinysrgb&w=150",
    dateAdded: "2023-07-10T00:00:00.000Z",
  },
];

// Mock data for pending invites
const initialPendingInvites = [
  {
    id: "inv1",
    email: "james@example.com",
    role: "Member",
    dateInvited: "2023-08-05T00:00:00.000Z",
  },
  {
    id: "inv2",
    email: "emma@example.com",
    role: "Admin",
    dateInvited: "2023-08-10T00:00:00.000Z",
  },
];

export default function TeamPage() {
  const [teamMembers, setTeamMembers] = useState(initialTeamMembers);
  const [pendingInvites, setPendingInvites] = useState(initialPendingInvites);
  const [showInviteForm, setShowInviteForm] = useState(false);
  const [inviteEmail, setInviteEmail] = useState("");
  const [inviteRole, setInviteRole] = useState("Member");

  const handleSendInvite = () => {
    if (!inviteEmail) return;
    
    const newInvite = {
      id: `inv${Date.now()}`,
      email: inviteEmail,
      role: inviteRole,
      dateInvited: new Date().toISOString(),
    };
    
    setPendingInvites([...pendingInvites, newInvite]);
    setInviteEmail("");
    setInviteRole("Member");
    setShowInviteForm(false);
  };

  const handleCancelInvite = (id: string) => {
    setPendingInvites(pendingInvites.filter((invite) => invite.id !== id));
  };

  const handleRemoveMember = (id: string) => {
    setTeamMembers(teamMembers.filter((member) => member.id !== id));
  };

  // Format date
  const formatDate = (dateString: string): string => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Update page title
  useEffect(() => {
    document.title = "Team Management - SaaSApp";
  }, []);

  return (
    <div className="space-y-6 p-6">
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Team Members</CardTitle>
            <CardDescription>
              Manage your team members and their roles.
            </CardDescription>
          </div>
          <Button
            variant="default"
            onClick={() => setShowInviteForm(!showInviteForm)}
          >
            <UserPlus className="mr-2 h-4 w-4" /> Invite Member
          </Button>
        </CardHeader>
        <CardContent>
          {showInviteForm && (
            <div className="mb-6 rounded-lg border border-border p-4">
              <h3 className="mb-4 font-medium">Invite a Team Member</h3>
              <div className="grid gap-4 md:grid-cols-3">
                <div className="space-y-2 md:col-span-2">
                  <label htmlFor="email" className="text-sm font-medium">
                    Email Address
                  </label>
                  <Input
                    id="email"
                    type="email"
                    placeholder="colleague@example.com"
                    value={inviteEmail}
                    onChange={(e) => setInviteEmail(e.target.value)}
                  />
                </div>
                <div className="space-y-2">
                  <label htmlFor="role" className="text-sm font-medium">
                    Role
                  </label>
                  <select
                    id="role"
                    className="w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                    value={inviteRole}
                    onChange={(e) => setInviteRole(e.target.value)}
                  >
                    <option value="Member">Member</option>
                    <option value="Admin">Admin</option>
                  </select>
                </div>
              </div>
              <div className="mt-4 flex justify-end space-x-2">
                <Button
                  variant="outline"
                  onClick={() => setShowInviteForm(false)}
                >
                  Cancel
                </Button>
                <Button onClick={handleSendInvite}>Send Invitation</Button>
              </div>
            </div>
          )}

          <div className="space-y-6">
            <div>
              <h3 className="mb-4 font-medium">Current Team Members</h3>
              <div className="rounded-md border">
                <div className="grid grid-cols-6 border-b bg-muted px-4 py-2 text-sm font-medium">
                  <div className="col-span-2">Name</div>
                  <div className="col-span-2">Email</div>
                  <div>Role</div>
                  <div>Actions</div>
                </div>
                {teamMembers.map((member) => (
                  <div
                    key={member.id}
                    className="grid grid-cols-6 items-center border-b px-4 py-3 text-sm last:border-0"
                  >
                    <div className="col-span-2 flex items-center gap-3">
                      <Avatar 
                        src={member.avatar} 
                        alt={member.name}
                        size="sm"
                      />
                      <span>{member.name}</span>
                    </div>
                    <div className="col-span-2">{member.email}</div>
                    <div>
                      <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                        {member.role}
                      </span>
                    </div>
                    <div>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                        onClick={() => handleRemoveMember(member.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {pendingInvites.length > 0 && (
              <div>
                <h3 className="mb-4 font-medium">Pending Invitations</h3>
                <div className="rounded-md border">
                  <div className="grid grid-cols-6 border-b bg-muted px-4 py-2 text-sm font-medium">
                    <div className="col-span-2">Email</div>
                    <div>Role</div>
                    <div className="col-span-2">Invited</div>
                    <div>Actions</div>
                  </div>
                  {pendingInvites.map((invite) => (
                    <div
                      key={invite.id}
                      className="grid grid-cols-6 items-center border-b px-4 py-3 text-sm last:border-0"
                    >
                      <div className="col-span-2 flex items-center gap-3">
                        <span className="flex h-8 w-8 items-center justify-center rounded-full bg-muted">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                        </span>
                        <span>{invite.email}</span>
                      </div>
                      <div>
                        <span className="inline-flex items-center rounded-full bg-primary/10 px-2 py-1 text-xs font-medium text-primary">
                          {invite.role}
                        </span>
                      </div>
                      <div className="col-span-2">
                        {formatDate(invite.dateInvited)}
                      </div>
                      <div>
                        <Button
                          variant="ghost"
                          size="sm"
                          className="text-destructive hover:bg-destructive/10 hover:text-destructive"
                          onClick={() => handleCancelInvite(invite.id)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Team Roles</CardTitle>
          <CardDescription>
            Learn about the different team roles and their permissions.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                  <Briefcase className="h-5 w-5 text-primary" />
                </span>
                <div>
                  <h4 className="font-medium">Admin</h4>
                  <p className="text-sm text-muted-foreground">
                    Full access to all features, can invite and manage team members,
                    and change billing settings.
                  </p>
                </div>
              </div>
            </div>
            
            <div className="rounded-md border p-4">
              <div className="flex items-center gap-3">
                <span className="flex h-10 w-10 items-center justify-center rounded-full bg-muted">
                  <Briefcase className="h-5 w-5 text-muted-foreground" />
                </span>
                <div>
                  <h4 className="font-medium">Member</h4>
                  <p className="text-sm text-muted-foreground">
                    Can access and contribute to projects, but cannot change team
                    settings or billing information.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}