import {
  AmbassadorApplication,
  ApiResponse,
  ContactMessage,
  Sponsor,
  TeamMember,
} from "@/types";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000";

export const COMPETITIONS_LIST = [
  "Speed Programming",
  "Mini Hackathon",
  "Counter-Strike 2",
  "Speech Competition",
  "Seerah Quiz",
  "Essay Writing",
  "Short Story Writing",
  "Painting & Visual Arts",
  "CYE Nexus & Career Pro Talks",
] as const;

export async function fetchTeamMembers(): Promise<TeamMember[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/team-about`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching team members:", error);
    return [];
  }
}

export async function fetchSponsors(): Promise<Sponsor[]> {
  try {
    const res = await fetch(`${API_BASE_URL}/sponsors`, {
      headers: { Accept: "application/json" },
      next: { revalidate: 60 },
    });
    if (!res.ok) return [];
    const data = await res.json();
    return Array.isArray(data) ? data : [];
  } catch (error) {
    console.error("Error fetching sponsors:", error);
    return [];
  }
}

export async function registerForCompetition(
  formData: FormData
): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/competitions/register`, {
      method: "POST",
      body: formData,
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Registration failed. Please check form details." };
    }
    return { success: true, message: data.message || "Successfully registered!" };
  } catch (error: any) {
    console.error("Registration submit error:", error);
    return { error: "Network error submitting application. Please try again." };
  }
}

export async function applyForAmbassador(
  payload: AmbassadorApplication
): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/ambassadors/apply`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Application submission failed." };
    }
    return { success: true, message: data.message || "Application submitted!" };
  } catch (error: any) {
    console.error("Ambassador apply error:", error);
    return { error: "Network error submitting application. Please try again." };
  }
}

export async function sendContactMessage(
  payload: ContactMessage
): Promise<ApiResponse> {
  try {
    const res = await fetch(`${API_BASE_URL}/contact/send`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });
    const data = await res.json();
    if (!res.ok) {
      return { error: data.error || "Failed to send message." };
    }
    return { success: true, message: data.message || "Message sent successfully!" };
  } catch (error: any) {
    console.error("Contact send error:", error);
    return { error: "Network error sending message. Please try again." };
  }
}
