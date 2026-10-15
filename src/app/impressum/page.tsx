import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Impressum",
  description: `Impressum von ${site.name}.`,
};

export default function ImpressumPage() {
  return (
    <LegalPage
      title="Impressum"
      subtitle="Angaben gemäß § 5 DDG · Mustertext – bitte mit deinen echten Unternehmensdaten ausfüllen."
    >
      <h2>Diensteanbieter</h2>
      <p>
        {site.name} – [Firmenname / Inhaber eintragen]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ und Ort]
        <br />
        Deutschland
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon: [Telefonnummer eintragen]
        <br />
        E-Mail: {site.supportEmail}
        <br />
        Website: https://www.{site.domain}
      </p>

      <h2>Vertretungsberechtigt</h2>
      <p>
        [Geschäftsführer / Inhaber eintragen]
      </p>

      <h2>Registereintrag</h2>
      <p>
        Handelsregister: [Amtsgericht eintragen]
        <br />
        Registernummer: [HRB-Nummer eintragen]
      </p>

      <h2>Umsatzsteuer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27a UStG:
        [DE-Nummer eintragen]
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <p>
        [Name und Anschrift der verantwortlichen Person eintragen]
      </p>

      <h2>EU-Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit. Wir sind nicht bereit und nicht
        verpflichtet, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Die Inhalte dieser Website wurden mit Sorgfalt erstellt. Für
        Richtigkeit, Vollständigkeit und Aktualität übernehmen wir dennoch
        keine Gewähr. Als Diensteanbieter sind wir für eigene Inhalte nach den
        allgemeinen Gesetzen verantwortlich; zur Überwachung fremder
        Informationen sind wir jedoch nicht verpflichtet.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Diese Website enthält ggf. Links zu externen Websites Dritter, auf
        deren Inhalte wir keinen Einfluss haben. Für die Inhalte verlinkter
        Seiten ist stets der jeweilige Anbieter verantwortlich. Zum Zeitpunkt
        der Verlinkung waren keine Rechtsverstöße erkennbar.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die auf dieser Website veröffentlichten Inhalte und Werke unterliegen
        dem deutschen Urheberrecht. Vervielfältigung, Bearbeitung und
        Verbreitung außerhalb der Grenzen des Urheberrechts bedürfen der
        vorherigen schriftlichen Zustimmung des jeweiligen Rechteinhabers.
      </p>
    </LegalPage>
  );
}
