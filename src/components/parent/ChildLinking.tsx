import { useState } from 'react';
import { UserPlus, Mail, Check, X, User } from 'lucide-react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import { LinkedChild, mockLinkedChild } from '@/lib/mockParentData';
import { toast } from 'sonner';

interface ChildLinkingProps {
  linkedChild: LinkedChild | null;
  onChildLinked: (child: LinkedChild) => void;
  onChildUnlinked: () => void;
}

export function ChildLinking({ linkedChild, onChildLinked, onChildUnlinked }: ChildLinkingProps) {
  const [email, setEmail] = useState('');
  const [isLinking, setIsLinking] = useState(false);

  const handleLinkChild = async () => {
    if (!email.trim()) {
      toast.error('Please enter an email address');
      return;
    }

    setIsLinking(true);
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1500));
    
    // Mock: Link the child
    onChildLinked({
      ...mockLinkedChild,
      email: email,
    });
    setEmail('');
    setIsLinking(false);
    toast.success('Child account linked successfully!');
  };

  const handleUnlink = () => {
    onChildUnlinked();
    toast.success('Child account unlinked');
  };

  if (linkedChild) {
    return (
      <Card className="rounded-3xl">
        <CardHeader>
          <CardTitle className="flex items-center gap-2">
            <User className="h-5 w-5 text-primary" />
            Linked Child
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Avatar className="h-14 w-14">
                <AvatarFallback className="bg-primary/10 text-primary text-lg">
                  {linkedChild.name.split(' ').map(n => n[0]).join('')}
                </AvatarFallback>
              </Avatar>
              <div>
                <h3 className="font-semibold text-lg">{linkedChild.name}</h3>
                <p className="text-sm text-muted-foreground">{linkedChild.email}</p>
                <Badge variant="outline" className="mt-1">Class {linkedChild.grade}</Badge>
              </div>
            </div>
            <Button variant="outline" size="sm" onClick={handleUnlink} className="rounded-full">
              <X className="h-4 w-4 mr-1" />
              Unlink
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card className="rounded-3xl">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <UserPlus className="h-5 w-5 text-primary" />
          Link Child's Account
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <p className="text-sm text-muted-foreground">
          Enter your child's registered email to link their account and monitor their progress.
        </p>
        <div className="flex gap-3">
          <div className="relative flex-1">
            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              placeholder="child@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="pl-10"
              type="email"
            />
          </div>
          <Button onClick={handleLinkChild} disabled={isLinking} className="rounded-full">
            {isLinking ? (
              <span className="animate-pulse">Linking...</span>
            ) : (
              <>
                <Check className="h-4 w-4 mr-2" />
                Link Account
              </>
            )}
          </Button>
        </div>
      </CardContent>
    </Card>
  );
}
