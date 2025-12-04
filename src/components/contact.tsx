import React from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Label } from '@/components/ui/label';
import { Checkbox } from '@/components/ui/checkbox';

type ContactFormData = {
  name: string;
  email: string;
  message: string;
  projectType: string[];
};

interface ContactSectionProps {
  /**
   * The title for the contact section.
   */
  title?: string;
  /**
   * The subtitle or main message for the introductory part.
   */
  mainMessage?: string;
  /**
   * The contact email to display.
   */
  contactEmail?: string;
  /**
   * Array of social media links. Each object should have an 'id', 'name', 'iconSrc', and 'href'.
   */
  socialLinks?: Array<{ id: string; name: string; iconSrc: string; href: string }>;
  /**
   * Callback function when the form is submitted.
   * @param data The form data.
   */
  onSubmit?: (data: ContactFormData) => void;
}

const defaultSocialLinks = [
  { id: '2', name: 'Instagram', iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/instagram.svg', href: 'https://www.instagram.com/yash_bharvada/' },
  { id: '3', name: 'LinkedIn', iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/linkedin.svg', href: 'https://in.linkedin.com/in/yash-bharvada-4361282b2' },
  { id: '4', name: 'GitHub', iconSrc: 'https://cdn.jsdelivr.net/npm/simple-icons@v5/icons/github.svg', href: 'https://github.com/Yash-Bharvada' },
];

export const ContactSection: React.FC<ContactSectionProps> = ({
  title = "We can turn your dream project into reality",
  mainMessage = "Let's talk!",
  contactEmail = "yashbharvada4@gmail.com",
  socialLinks = defaultSocialLinks,
  onSubmit,
}) => {
  const [formData, setFormData] = React.useState<ContactFormData>({
    name: '',
    email: '',
    message: '',
    projectType: [],
  });
  const [status, setStatus] = React.useState<"idle"|"loading"|"success"|"error">("idle");
  const [feedback, setFeedback] = React.useState<string>("");

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleCheckboxChange = (type: string, checked: boolean) => {
    setFormData((prev) => {
      const currentTypes = prev.projectType;
      if (checked) {
        return { ...prev, projectType: [...currentTypes, type] };
      } else {
        return { ...prev, projectType: currentTypes.filter((t) => t !== type) };
      }
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit?.(formData);
    try {
      setStatus("loading");
      setFeedback("");
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      });
      const json = await res.json();
      if (res.ok && json?.ok) {
        setStatus("success");
        setFeedback("Message sent successfully.");
        setFormData({ name: '', email: '', message: '', projectType: [] });
      } else {
        setStatus("error");
        setFeedback("Failed to send message.");
      }
    } catch {
      setStatus("error");
      setFeedback("Failed to send message.");
    }
  };

  const projectTypeOptions = [
    'Website',
    'Web App',
    'Portfolio / Landing Page',
    'Auth & Forms',
    'API Integration',
    'Dashboard / Analytics',
    'AI/ML Model Integration',
    'Chatbot (RAG)',
    'Data Pipeline',
    'Inference API',
    'Model Training / Tuning',
    'Other',
  ];

  return (
    <section className="relative min-h-screen w-screen overflow-hidden bg-neutral-950">

      {/* Main Content Overlay */}
      <div className="relative z-10 flex flex-col items-center justify-center w-full h-full p-4 md:p-8 lg:p-12">
        {/* Main Section - Grid Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 w-full max-w-7xl p-4 md:p-8 rounded-xl flex-grow">
          {/* Left Side: Title */}
          <div className="flex flex-col justify-center items-start p-4 lg:p-8">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-extrabold text-foreground leading-tight drop-shadow-lg max-w-lg">
              {title}
            </h1>
          </div>

          {/* Right Side: Contact Form */}
          <div className="bg-background/90 p-6 md:p-8 rounded-lg shadow-xl border border-border">
            <h2 className="text-2xl font-bold text-foreground mb-6">{mainMessage}</h2>

            {/* Email & Socials */}
            <div className="mb-6">
              <p className="text-muted-foreground mb-2">Mail me at</p>
              <a href={`mailto:${contactEmail}`} className="text-primary hover:underline font-medium">
                {contactEmail}
              </a>
              <div className="flex items-center space-x-3 mt-4">
                <span className="text-muted-foreground">OR</span>
                {socialLinks.map((link) => (
                  <Button key={link.id} variant="outline" size="icon" asChild>
                    <a href={link.href} aria-label={link.name} target="_blank" rel="noopener noreferrer">
                      {/* Using a simple placeholder for icons. In a real app, use react-icons or SVG components */}
                      <img src={link.iconSrc} alt={link.name} className="h-4 w-4 dark:invert" />
                    </a>
                  </Button>
                ))}
              </div>
            </div>

            <hr className="my-6 border-border" />

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              <p className="text-muted-foreground">Leave us a brief message</p>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="name">Your name</Label>
                  <Input id="name" name="name" placeholder="Your name" value={formData.name} onChange={handleChange} required />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="email">Email</Label>
                  <Input id="email" name="email" type="email" placeholder="Email" value={formData.email} onChange={handleChange} required />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="message">Briefly describe your project idea...</Label>
                <Textarea
                  id="message"
                  name="message"
                  placeholder="Briefly describe your project idea..."
                  className="min-h-[80px]"
                  value={formData.message}
                  onChange={handleChange}
                  required
                />
              </div>

              <div className="space-y-4">
                <p className="text-muted-foreground">I&apos;m looking for...</p>
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                  {projectTypeOptions.map((option) => (
                    <div key={option} className="flex items-center space-x-2">
                      <Checkbox
                        id={option.replace(/\s/g, '-').toLowerCase()}
                        checked={formData.projectType.includes(option)}
                        onCheckedChange={(checked) => handleCheckboxChange(option, checked as boolean)}
                      />
                      <Label htmlFor={option.replace(/\s/g, '-').toLowerCase()} className="text-sm font-normal">
                        {option}
                      </Label>
                    </div>
                  ))}
                </div>
              </div>

              <Button type="submit" className="w-full" disabled={status === "loading"}>
                Send a message
              </Button>
              {feedback && (
                <p className="text-sm mt-2 text-muted-foreground">{feedback}</p>
              )}
            </form>
          </div>
        </div>
      </div>

      {/* Removed bubble animation CSS for theme consistency */}
    </section>
  );
};
