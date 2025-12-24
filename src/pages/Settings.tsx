import { useState } from "react";
import { Link } from "react-router-dom";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { LANGUAGES, COIN_PACKS, SUBJECTS_BY_GRADE } from "@/lib/constants";
import { favoriteTopics } from "@/lib/mockSocialData";
import { 
  User, 
  GraduationCap, 
  Palette, 
  Coins, 
  Save,
  Crown,
  ArrowLeft,
  Camera,
  Heart,
  X,
  Check,
} from "lucide-react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";

export default function Settings() {
  const { user, updateUser } = useAuth();
  const { theme, setTheme } = useTheme();
  
  // Profile Settings
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [dob, setDob] = useState("");
  const [photoUrl, setPhotoUrl] = useState("");
  
  // Academic Settings
  const [grade, setGrade] = useState<string>(user?.grade?.toString() || "12");
  const [board, setBoard] = useState<string>(user?.educationBoard || "CBSE");
  
  // Preferences
  const [language, setLanguage] = useState<string>("en");
  const [selectedTopics, setSelectedTopics] = useState<string[]>(favoriteTopics);

  const allTopics = SUBJECTS_BY_GRADE[parseInt(grade) as 11 | 12]?.flatMap(s => 
    s.topics.map(t => ({ topic: t as string, subject: s.name }))
  ) || [];

  const handleSaveProfile = () => {
    updateUser({ name });
    toast.success("Profile updated successfully!");
  };

  const handleSaveAcademic = () => {
    updateUser({ 
      grade: parseInt(grade) as 11 | 12, 
      educationBoard: board 
    });
    toast.success("Academic settings updated!");
  };

  const handleThemeChange = (newTheme: "egyptian-night" | "chai-spice") => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme === "egyptian-night" ? "Egyptian Night" : "Chai Spice"}!`);
  };

  const toggleFavoriteTopic = (topic: string) => {
    setSelectedTopics(prev => 
      prev.includes(topic) 
        ? prev.filter(t => t !== topic)
        : [...prev, topic]
    );
  };

  const handleBuyCoins = (packId: string, coins: number, price: number) => {
    toast.success(`Purchased ${coins} coins for ₹${price}! (Demo mode)`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 pt-24 pb-12">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Button variant="ghost" size="icon" asChild>
            <Link to="/dashboard">
              <ArrowLeft className="h-5 w-5" />
            </Link>
          </Button>
          <h1 className="font-display text-3xl font-bold text-foreground">
            Settings
          </h1>
        </div>

        <Tabs defaultValue="profile" className="space-y-6">
          <TabsList className="grid w-full max-w-lg grid-cols-4 h-12 rounded-2xl">
            <TabsTrigger value="profile" className="rounded-xl">
              <User className="h-4 w-4 mr-2 hidden sm:block" />
              Profile
            </TabsTrigger>
            <TabsTrigger value="academic" className="rounded-xl">
              <GraduationCap className="h-4 w-4 mr-2 hidden sm:block" />
              Academic
            </TabsTrigger>
            <TabsTrigger value="preferences" className="rounded-xl">
              <Palette className="h-4 w-4 mr-2 hidden sm:block" />
              Preferences
            </TabsTrigger>
            <TabsTrigger value="coins" className="rounded-xl">
              <Coins className="h-4 w-4 mr-2 hidden sm:block" />
              Coins
            </TabsTrigger>
          </TabsList>

          {/* Profile Tab */}
          <TabsContent value="profile">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Profile Photo */}
              <section className="rounded-3xl border bg-card p-6">
                <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                  <Camera className="h-5 w-5 text-primary" />
                  Profile Photo
                </h2>
                <div className="flex items-center gap-6">
                  <Avatar className="h-24 w-24">
                    <AvatarImage src={photoUrl || user?.photoUrl} />
                    <AvatarFallback className="text-2xl bg-primary/10 text-primary">
                      {user?.name?.split(' ').map(n => n[0]).join('') || 'U'}
                    </AvatarFallback>
                  </Avatar>
                  <div className="flex-1 space-y-2">
                    <Input
                      placeholder="Enter photo URL"
                      value={photoUrl}
                      onChange={(e) => setPhotoUrl(e.target.value)}
                    />
                    <p className="text-xs text-muted-foreground">
                      Enter a URL to your profile picture
                    </p>
                  </div>
                </div>
              </section>

              {/* Personal Info */}
              <section className="rounded-3xl border bg-card p-6">
                <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                  <User className="h-5 w-5 text-primary" />
                  Personal Information
                </h2>
                <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      value={user?.email || ""}
                      disabled
                      className="mt-1.5 opacity-60"
                    />
                    <p className="text-xs text-muted-foreground mt-1">
                      Email cannot be changed
                    </p>
                  </div>

                  <div>
                    <Label htmlFor="dob">Date of Birth</Label>
                    <Input
                      id="dob"
                      type="date"
                      value={dob}
                      onChange={(e) => setDob(e.target.value)}
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="10-digit mobile number"
                      className="mt-1.5"
                    />
                  </div>

                  <div>
                    <Label htmlFor="school">School Name</Label>
                    <Input
                      id="school"
                      value={school}
                      onChange={(e) => setSchool(e.target.value)}
                      placeholder="Enter your school name"
                      className="mt-1.5"
                    />
                  </div>

                  <Button onClick={handleSaveProfile} className="w-full rounded-full">
                    <Save className="h-4 w-4 mr-2" />
                    Save Profile
                  </Button>
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Academic Tab */}
          <TabsContent value="academic">
            <section className="rounded-3xl border bg-card p-6 max-w-lg">
              <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <GraduationCap className="h-5 w-5 text-primary" />
                Academic Settings
              </h2>
              <div className="space-y-4">
                <div>
                  <Label>Grade</Label>
                  <Select value={grade} onValueChange={setGrade}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="11">Class 11</SelectItem>
                      <SelectItem value="12">Class 12</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div>
                  <Label>Education Board</Label>
                  <Select value={board} onValueChange={setBoard}>
                    <SelectTrigger className="mt-1.5">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="CBSE">CBSE</SelectItem>
                      <SelectItem value="ICSE">ICSE</SelectItem>
                      <SelectItem value="State Board">State Board</SelectItem>
                      <SelectItem value="IB">IB</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <Button onClick={handleSaveAcademic} className="w-full rounded-full">
                  <Save className="h-4 w-4 mr-2" />
                  Save Academic Settings
                </Button>
              </div>
            </section>
          </TabsContent>

          {/* Preferences Tab */}
          <TabsContent value="preferences">
            <div className="grid gap-6 lg:grid-cols-2">
              {/* Language & Theme */}
              <section className="rounded-3xl border bg-card p-6">
                <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                  <Palette className="h-5 w-5 text-primary" />
                  Language & Theme
                </h2>
                <div className="space-y-6">
                  <div>
                    <Label>Preferred Language</Label>
                    <Select value={language} onValueChange={setLanguage}>
                      <SelectTrigger className="mt-1.5">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        {LANGUAGES.map((lang) => (
                          <SelectItem key={lang.code} value={lang.code}>
                            {lang.name}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label>Color Theme</Label>
                    <div className="grid grid-cols-2 gap-3 mt-2">
                      <button
                        onClick={() => handleThemeChange("egyptian-night")}
                        className={cn(
                          "p-4 rounded-2xl border-2 transition-all",
                          theme === "egyptian-night" 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="h-16 rounded-xl bg-gradient-to-br from-[#1a1625] to-[#2d1f4e] mb-2 flex items-center justify-center">
                          {theme === "egyptian-night" && <Check className="h-6 w-6 text-white" />}
                        </div>
                        <span className="text-sm font-medium">Egyptian Night</span>
                        <p className="text-xs text-muted-foreground">Dark theme</p>
                      </button>
                      <button
                        onClick={() => handleThemeChange("chai-spice")}
                        className={cn(
                          "p-4 rounded-2xl border-2 transition-all",
                          theme === "chai-spice" 
                            ? "border-primary bg-primary/10" 
                            : "border-border hover:border-primary/50"
                        )}
                      >
                        <div className="h-16 rounded-xl bg-gradient-to-br from-[#FFF9F2] to-[#D97706] mb-2 flex items-center justify-center">
                          {theme === "chai-spice" && <Check className="h-6 w-6 text-[#451A03]" />}
                        </div>
                        <span className="text-sm font-medium">Chai Spice</span>
                        <p className="text-xs text-muted-foreground">Warm theme</p>
                      </button>
                    </div>
                  </div>
                </div>
              </section>

              {/* Favorite Topics */}
              <section className="rounded-3xl border bg-card p-6">
                <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                  <Heart className="h-5 w-5 text-primary" />
                  Favorite Topics
                </h2>
                <p className="text-sm text-muted-foreground mb-4">
                  Select topics you want to focus on. These will be highlighted in your dashboard.
                </p>
                <div className="flex flex-wrap gap-2 max-h-[300px] overflow-y-auto">
                  {allTopics.map(({ topic, subject }) => (
                    <button
                      key={topic}
                      onClick={() => toggleFavoriteTopic(topic)}
                      className={cn(
                        "px-3 py-1.5 rounded-full text-sm transition-all flex items-center gap-1",
                        selectedTopics.includes(topic)
                          ? "bg-primary text-primary-foreground"
                          : "bg-muted hover:bg-muted/80"
                      )}
                    >
                      {topic}
                      {selectedTopics.includes(topic) && <X className="h-3 w-3" />}
                    </button>
                  ))}
                </div>
                <div className="mt-4 flex items-center gap-2">
                  <Badge variant="outline">{selectedTopics.length} selected</Badge>
                  <Button 
                    variant="ghost" 
                    size="sm" 
                    onClick={() => setSelectedTopics([])}
                    className="text-xs"
                  >
                    Clear all
                  </Button>
                </div>
              </section>
            </div>
          </TabsContent>

          {/* Coins Tab */}
          <TabsContent value="coins">
            <section className="rounded-3xl border bg-card p-6 max-w-lg">
              <h2 className="font-display text-xl font-semibold mb-6 flex items-center gap-2">
                <Coins className="h-5 w-5 text-gold" />
                Coins & Subscription
              </h2>

              <div className="flex items-center justify-between p-4 rounded-2xl bg-gold/10 border border-gold/20 mb-6">
                <div>
                  <p className="text-sm text-muted-foreground">Current Balance</p>
                  <p className="text-3xl font-bold text-gold">{user?.coins || 100}</p>
                </div>
                <div className="flex flex-col items-end gap-1">
                  <Crown className="h-8 w-8 text-gold" />
                  <Badge variant={user?.subscriptionStatus === 'pro' ? 'default' : 'outline'}>
                    {user?.subscriptionStatus === 'pro' ? 'Pro' : 'Free'}
                  </Badge>
                </div>
              </div>

              <div className="space-y-3">
                <p className="text-sm font-medium">Buy More Coins</p>
                {COIN_PACKS.map((pack) => (
                  <button
                    key={pack.id}
                    onClick={() => handleBuyCoins(pack.id, pack.coins, pack.price)}
                    className={cn(
                      "w-full flex items-center justify-between p-4 rounded-2xl border transition-all",
                      pack.popular 
                        ? "border-primary bg-primary/5" 
                        : "border-border hover:border-primary/50"
                    )}
                  >
                    <div className="flex items-center gap-3">
                      <Coins className="h-5 w-5 text-gold" />
                      <div className="text-left">
                        <span className="font-medium">{pack.coins} Coins</span>
                        {pack.popular && (
                          <Badge className="ml-2 text-xs">Best Value</Badge>
                        )}
                      </div>
                    </div>
                    <span className="font-bold text-primary">₹{pack.price}</span>
                  </button>
                ))}
              </div>
            </section>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
