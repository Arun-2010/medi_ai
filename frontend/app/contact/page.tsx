import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contact · MediAI",
  description: "How to reach the MediAI team.",
};

export default function ContactPage() {
  return (
    <LegalPage title="Contact">
      <LegalSection title="Write to us">
        <p>
          Questions, ideas, or something not working? Email{" "}
          <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
        <p>To delete your account, email us from the address you signed in with.</p>
      </LegalSection>

      <LegalSection title="Need to talk to someone now?">
        <p>
          MediAI cannot help in a crisis. Please call Tele-MANAS at <a href="tel:14416">14416</a>{" "}
          (India, free). In an emergency, call <a href="tel:112">112</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
