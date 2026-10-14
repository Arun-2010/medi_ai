import type { Metadata } from "next";
import { LegalPage, LegalSection } from "@/components/LegalPage";
import { CONTACT_EMAIL, LEGAL_UPDATED } from "@/lib/site";

export const metadata: Metadata = {
  title: "Terms of Use · MediAI",
  description: "The simple rules for using MediAI.",
};

export default function TermsPage() {
  return (
    <LegalPage title="Terms of Use" updated={LEGAL_UPDATED}>
      <LegalSection title="What MediAI is">
        <p>
          MediAI is a free meditation and relaxation guide for everyday stress, focus and sleep. By
          using it, you agree to these terms.
        </p>
      </LegalSection>

      <LegalSection title="Not medical advice">
        <p>
          MediAI is not a medical service and is not a replacement for a doctor, counsellor or other
          professional. If you are in distress, call Tele-MANAS at <a href="tel:14416">14416</a>{" "}
          (India). In an emergency, call <a href="tel:112">112</a>.
        </p>
      </LegalSection>

      <LegalSection title="Stay safe">
        <ul>
          <li>Do not use a session while driving or doing anything that needs your full attention.</li>
          <li>Stop any practice that does not feel right. You can always just breathe slowly.</li>
        </ul>
      </LegalSection>

      <LegalSection title="Your account">
        <p>
          You sign in with your email or Google account, so please keep that account safe. If you
          are under 18, please use MediAI with the permission of a parent or guardian.
        </p>
      </LegalSection>

      <LegalSection title="Fair use">
        <p>
          Please do not misuse MediAI, for example by trying to break it, reach other people’s data,
          or overload it. We may close accounts that do.
        </p>
      </LegalSection>

      <LegalSection title="The service">
        <p>
          MediAI is offered free and as it is. We try to keep it working well, but we cannot promise
          it will always be available or free of mistakes. Sessions may be written with the help of
          AI. We may change or stop features over time.
        </p>
      </LegalSection>

      <LegalSection title="Your data">
        <p>
          How we handle your data is explained in our <a href="/privacy">Privacy Policy</a>.
        </p>
      </LegalSection>

      <LegalSection title="Changes and questions">
        <p>
          If we change these terms, we will update this page and the date at the top. Questions?
          Write to <a href={`mailto:${CONTACT_EMAIL}`}>{CONTACT_EMAIL}</a>.
        </p>
      </LegalSection>
    </LegalPage>
  );
}
