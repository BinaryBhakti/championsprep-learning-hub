import { useState } from "react";
import { Navbar } from "@/components/layout/Navbar";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from "@/contexts/AuthContext";
import { useTheme } from "@/contexts/ThemeContext";
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from "@/components/ui/select";
import { LANGUAGES, COIN_PACKS } from "@/lib/constants";
import { 
  User, 
  GraduationCap, 
  Palette, 
  Coins, 
  Save,
  Crown
} from "lucide-react";
import { toast } from "sonner";

export default function Settings() {
  const { user } = useAuth();
  const { theme, setTheme } = useTheme();
  const [name, setName] = useState(user?.name || "");
  const [phone, setPhone] = useState("");
  const [school, setSchool] = useState("");
  const [grade, setGrade] = useState<string>("12");
  const [board, setBoard] = useState<string>("CBSE");
  const [language, setLanguage] = useState<string>("en");

  const handleSaveProfile = () => {
    toast.success("Profile updated successfully!");
  };

  const handleThemeChange = (newTheme: "egyptian-night" | "chai-spice") => {
    setTheme(newTheme);
    toast.success(`Theme changed to ${newTheme === "egyptian-night" ? "Egyptian Night" : "Chai Spice"}!`);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <h1 className="font-display text-3xl font-bold text-foreground mb-8">
          Settings
        </h1>

        <div className="grid gap-8 lg:grid-cols-2">
          {/* Profile Settings */}
          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-primary/20">
                <User className="h-5 w-5 text-primary" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Profile
              </h2>
            </div>

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

              <Button onClick={handleSaveProfile} className="w-full mt-2">
                <Save className="h-4 w-4 mr-2" />
                Save Profile
              </Button>
            </div>
          </section>

          {/* Academic Settings */}
          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-accent/20">
                <GraduationCap className="h-5 w-5 text-accent" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Academic
              </h2>
            </div>

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
            </div>
          </section>

          {/* Appearance Settings */}
          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-secondary/20">
                <Palette className="h-5 w-5 text-secondary" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Appearance
              </h2>
            </div>

            <div className="space-y-4">
              <div>
                <Label>Color Theme</Label>
                <Select value={theme} onValueChange={(v) => handleThemeChange(v as "egyptian-night" | "chai-spice")}>
                  <SelectTrigger className="mt-1.5">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="egyptian-night">Egyptian Night (Dark)</SelectItem>
                    <SelectItem value="chai-spice">Chai Spice (Warm)</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="grid grid-cols-2 gap-3 mt-4">
                <button
                  onClick={() => handleThemeChange("egyptian-night")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === "egyptian-night" 
                      ? "border-primary bg-primary/10" 
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <div className="h-12 rounded-lg bg-gradient-to-br from-[#1a1625] to-[#2d1f4e] mb-2" />
                  <span className="text-sm text-foreground">Egyptian Night</span>
                </button>
                <button
                  onClick={() => handleThemeChange("chai-spice")}
                  className={`p-4 rounded-xl border-2 transition-all ${
                    theme === "chai-spice" 
                      ? "border-primary bg-primary/10" 
                      : "border-border/50 hover:border-border"
                  }`}
                >
                  <div className="h-12 rounded-lg bg-gradient-to-br from-[#f5e6d3] to-[#e8c4a0] mb-2" />
                  <span className="text-sm text-foreground">Chai Spice</span>
                </button>
              </div>
            </div>
          </section>

          {/* Coins & Subscription */}
          <section className="rounded-2xl border border-border/50 bg-card/50 p-6 backdrop-blur-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gold/20">
                <Coins className="h-5 w-5 text-gold" />
              </div>
              <h2 className="font-display text-xl font-semibold text-foreground">
                Coins & Subscription
              </h2>
            </div>

            <div className="flex items-center justify-between p-4 rounded-xl bg-gold/10 border border-gold/20 mb-6">
              <div>
                <p className="text-sm text-muted-foreground">Current Balance</p>
                <p className="text-2xl font-bold text-gold">{user?.coins || 100} Coins</p>
              </div>
              <Crown className="h-8 w-8 text-gold" />
            </div>

            <div className="space-y-3">
              <p className="text-sm font-medium text-foreground">Buy More Coins</p>
              {COIN_PACKS.map((pack) => (
                <button
                  key={pack.id}
                  className="w-full flex items-center justify-between p-4 rounded-xl border border-border/50 hover:border-primary/50 hover:bg-primary/5 transition-all"
                >
                  <div className="flex items-center gap-3">
                    <Coins className="h-5 w-5 text-gold" />
                    <span className="font-medium text-foreground">{pack.coins} Coins</span>
                  </div>
                  <span className="font-bold text-primary">₹{pack.price}</span>
                </button>
              ))}
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
