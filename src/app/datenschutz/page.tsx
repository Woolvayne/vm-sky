import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Datenschutzerklärung",
  description: `Datenschutzerklärung von ${site.name} – Informationen zur Verarbeitung personenbezogener Daten gemäß DSGVO.`,
};

export default function DatenschutzPage() {
  return (
    <LegalPage
      title="Datenschutzerklärung"
      subtitle={`Stand: ${new Date().toLocaleDateString("de-DE")} · Bitte vor Veröffentlichung juristisch prüfen und mit deinen Unternehmensdaten ergänzen.`}
    >
      <p>
        <strong>Hinweis:</strong> Diese Datenschutzerklärung ist ein
        Mustertext, den wir für dich vorbereitet haben. Er ersetzt keine
        Rechtsberatung. Ergänze die mit [Klammern] markierten Angaben und lass
        das Dokument vor Liveschaltung rechtlich prüfen.
      </p>

      <h2>1. Verantwortliche Stelle</h2>
      <p>
        Verantwortlich für die Datenverarbeitung auf dieser Website und im
        Rahmen der Serverbereitstellung ist:
      </p>
      <p>
        {site.name} – [Firmenname eintragen]
        <br />
        [Straße und Hausnummer]
        <br />
        [PLZ und Ort], Deutschland
        <br />
        E-Mail: {site.supportEmail}
      </p>
      <p>
        Bei Fragen zum Datenschutz erreichst du uns jederzeit unter der oben
        genannten Adresse oder per E-Mail.
      </p>

      <h2>2. Allgemeines zur Datenverarbeitung</h2>
      <p>
        Wir verarbeiten personenbezogene Daten nur, soweit dies zur
        Bereitstellung dieser Website, zur Vertragserfüllung (Bestellung,
        Provisionierung und Verlängerung von Servern) oder aufgrund
        gesetzlicher Pflichten erforderlich ist. Maßgebliche Rechtsgrundlagen
        sind insbesondere Art. 6 Abs. 1 lit. a, b, c und f DSGVO.
      </p>

      <h2>3. Hosting und Server-Logfiles</h2>
      <p>
        Beim Aufruf dieser Website werden durch den Hosting-Dienstleister
        automatisch technische Zugriffsdaten verarbeitet (sog. Server-Logfiles),
        insbesondere:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Geräts</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Seite bzw. Datei</li>
        <li>übertragene Datenmenge und Browsertyp/-version</li>
        <li>Betriebssystem und Referrer-URL</li>
      </ul>
      <p>
        Die Verarbeitung erfolgt auf Grundlage von Art. 6 Abs. 1 lit. f DSGVO.
        Unser berechtigtes Interesse liegt im sicheren, stabilen Betrieb des
        Angebots sowie in der Abwehr von Angriffen. Logdaten werden nach
        [Frist, z. B. 7 Tagen] gelöscht, sofern keine gesetzliche
        Aufbewahrungspflicht besteht.
      </p>

      <h2>4. Bestellungen und Kundenkonto</h2>
      <p>
        Zur Abwicklung deiner Bestellung verarbeiten wir die folgenden Daten:
        Vor- und Nachname, E-Mail-Adresse, gewählte Serverkonfiguration,
        Laufzeit, Bestellnummer sowie Zahlungs- und Abrechnungsdaten.
      </p>
      <ul>
        <li>
          <strong>Zweck:</strong> Vertragsanbahnung und -erfüllung,
          Provisionierung des Servers, Abrechnung, Kundenkommunikation.
        </li>
        <li>
          <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO.
        </li>
        <li>
          <strong>Speicherdauer:</strong> bis zum Ablauf gesetzlicher
          Aufbewahrungsfristen (in der Regel 6 bis 10 Jahre nach HGB/AO),
          danach Löschung.
        </li>
      </ul>

      <h2>5. Weitergabe an den Infrastruktur-Anbieter</h2>
      <p>
        Zur technischen Bereitstellung deines Servers übermitteln wir die dafür
        erforderlichen Daten (insbesondere Serverkonfiguration und technische
        Kontakt-E-Mail) an unseren Upstream-/Infrastruktur-Partner, mit dem ein
        Vertrag zur Auftragsverarbeitung bzw. eine entsprechende Vereinbarung
        gemäß Art. 28 DSGVO besteht. Die Server stehen in Rechenzentren
        innerhalb Deutschlands bzw. der Europäischen Union; eine Übermittlung in
        Drittstaaten findet nicht statt, sofern nicht ausdrücklich anders
        angegeben.
      </p>

      <h2>6. Zahlungsabwicklung</h2>
      <p>
        Je nach gewählter Zahlungsart werden Zahlungsdaten an den jeweiligen
        Zahlungsdienstleister übermittelt (z. B. Kreditkarten-Abwickler,
        PayPal, Bank bei SEPA-Überweisung oder Dienstleister für
        Krypto-Zahlungen). Die Verarbeitung erfolgt zur Vertragserfüllung gemäß
        Art. 6 Abs. 1 lit. b DSGVO. Es gelten ergänzend die
        Datenschutzbestimmungen des jeweiligen Zahlungsdienstleisters.
      </p>

      <h2>7. Kontaktaufnahme</h2>
      <p>
        Bei Anfragen über das Kontaktformular oder per E-Mail verarbeiten wir
        deine Angaben (Name, E-Mail-Adresse, Inhalt der Nachricht) zur
        Bearbeitung der Anfrage. Rechtsgrundlage ist Art. 6 Abs. 1 lit. b
        DSGVO, bei allgemeinen Anfragen Art. 6 Abs. 1 lit. f DSGVO. Die Daten
        werden gelöscht, sobald die Anfrage abschließend bearbeitet ist und
        keine Aufbewahrungspflichten bestehen.
      </p>

      <h2>8. Cookies und lokale Speicherung</h2>
      <p>
        Diese Website verwendet ausschließlich technisch notwendige
        Speichermechanismen, die für den Betrieb und die Sicherheit der Seite
        erforderlich sind. Es werden keine Tracking- oder Marketing-Cookies
        gesetzt und keine Analysewerkzeuge von Drittanbietern eingebunden.
        Rechtsgrundlage ist § 25 Abs. 2 TDDDG i. V. m. Art. 6 Abs. 1 lit. f
        DSGVO.
      </p>

      <h2>9. Empfänger und Kategorien von Empfängern</h2>
      <p>Deine Daten können an folgende Kategorien von Empfängern übermittelt werden:</p>
      <ul>
        <li>Hosting- und Infrastruktur-Dienstleister (Auftragsverarbeiter)</li>
        <li>Zahlungsdienstleister und Banken</li>
        <li>IT-Dienstleister zur Wartung und zum Betrieb unserer Systeme</li>
        <li>Behörden, soweit gesetzlich verpflichtend</li>
      </ul>

      <h2>10. Deine Rechte</h2>
      <p>Dir stehen nach Maßgabe der DSGVO folgende Rechte zu:</p>
      <ul>
        <li>Auskunft über deine gespeicherten Daten (Art. 15 DSGVO)</li>
        <li>Berichtigung unrichtiger Daten (Art. 16 DSGVO)</li>
        <li>Löschung (Art. 17 DSGVO)</li>
        <li>Einschränkung der Verarbeitung (Art. 18 DSGVO)</li>
        <li>Datenübertragbarkeit (Art. 20 DSGVO)</li>
        <li>Widerspruch gegen die Verarbeitung (Art. 21 DSGVO)</li>
        <li>Widerruf erteilter Einwilligungen mit Wirkung für die Zukunft (Art. 7 Abs. 3 DSGVO)</li>
      </ul>
      <p>
        Zudem hast du das Recht, dich bei einer
        Datenschutz-Aufsichtsbehörde zu beschweren (Art. 77 DSGVO). Zuständig
        ist insbesondere die Aufsichtsbehörde des Bundeslandes, in dem unser
        Sitz liegt.
      </p>

      <h2>11. Datensicherheit</h2>
      <p>
        Wir setzen technische und organisatorische Maßnahmen ein, um deine
        Daten gegen Verlust, Manipulation und unbefugten Zugriff zu schützen.
        Dazu gehören verschlüsselte Übertragung (TLS), Zugriffsbeschränkungen
        und regelmäßige Updates unserer Systeme.
      </p>

      <h2>12. Änderungen dieser Erklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, sobald Änderungen der
        Datenverarbeitung oder der Rechtslage dies erforderlich machen. Es
        gilt die jeweils auf dieser Seite veröffentlichte Fassung.
      </p>
    </LegalPage>
  );
}
