import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Privacy Policy · MediAI",
  description: "What MediAI stores about you, why, and how to delete it.",
};

export default function PrivacyPage() {
  const mail = <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>;

  return (
    <LegalPage title="Privacy Policy" updated={LEGAL_UPDATED}>
      <LegalSection title="In short">
        <p>
          MediAI keeps as little about you as it can. We store your email and your journal so you
          can see them again. We do not sell your data, and we do not show ads.
        </p>
      </LegalSection>

      <LegalSection title="What we store">
        <ul>
          <li>
            <strong>Your account.</strong> Your email address. If you sign in with Google, we also
            get your name and profile picture from Google.
          </li>
          <li>
            <strong>Your journal.</strong> When you choose “Save to journal” after a session, we
            store which session you did, how many minutes, how you felt, and the short note you
            wrote (if any). Your streak is worked out from these entries.
          </li>
        </ul>
        <p>You can try a session without signing in. Then we store nothing about you.</p>
      </LegalSection>

      <LegalSection title="What stays on your device">
        <ul>
          <li>
            <strong>What you type about your mood.</strong> It is read in your browser to pick a
            session. It is not sent to us or saved.
          </li>
          <li>
            <strong>The voice.</strong> Sessions are read aloud by your browser’s built-in voice.
          </li>
          <li>
            <strong>Small settings.</strong> Your browser remembers which script you heard last, so
            the next session is different. A sign-in cookie keeps you signed in.
          </li>
        </ul>
      </LegalSection>

      <LegalSection title="Who helps us run MediAI">
        <ul>
          <li>
            <strong>Supabase</strong> stores accounts and journal entries, and sends sign-in emails.
          </li>
          <li>
            <strong>Vercel</strong> hosts the website. Vercel Web Analytics counts page visits
            without cookies and without identifying you.
          </li>
          <li>
            <strong>Google</strong>, only if you choose “Continue with Google”.
          </li>
        </ul>
        <p>These services handle your data only to run MediAI for you.</p>
      </LegalSection>

      <LegalSection title="Who can see your journal">
        <p>
          Only you. The database lets each signed-in person read only their own entries. We do not
          read your notes unless you ask us to help with a problem.
        </p>
      </LegalSection>

      <LegalSection title="Deleting your data">
        <p>
          To delete your journal entries, or your whole account and everything linked to it, email{" "}
          {mail} from the address you signed in with. We will delete it within 30 days and let you
          know when it is done.
        </p>
      </LegalSection>

      <LegalSection title="Children">
        <p>If you are under 18, please use MediAI with the permission of a parent or guardian.</p>
      </LegalSection>

      <LegalSection title="Changes">
        <p>If we change what we store, we will update this page and the date at the top.</p>
      </LegalSection>

      <LegalSection title="Questions">
        <p>Write to {mail}.</p>
      </LegalSection>
    </LegalPage>
  );
}
