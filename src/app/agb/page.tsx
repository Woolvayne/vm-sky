import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Allgemeine Geschäftsbedingungen",
  description: `AGB von ${site.name} für die Bereitstellung virtueller Server.`,
};

export default function AgbPage() {
  return (
    <LegalPage
      title="Allgemeine Geschäftsbedingungen"
      subtitle={`Stand: ${new Date().toLocaleDateString("de-DE")} · Mustertext – bitte mit deinen Unternehmensdaten ergänzen und rechtlich prüfen lassen.`}
    >
      <h2>§ 1 Geltungsbereich</h2>
      <p>
        Diese Allgemeinen Geschäftsbedingungen (nachfolgend „AGB") gelten für
        alle Verträge zwischen {site.name} – [Firmenname eintragen], [Adresse]
        (nachfolgend „Anbieter") und dem Kunden über die Bereitstellung
        virtueller KVM-Server und damit zusammenhängender Leistungen.
        Abweichende Bedingungen des Kunden werden nicht Vertragsinhalt, es sei
        denn, der Anbieter stimmt ihrer Geltung ausdrücklich zu.
      </p>

      <h2>§ 2 Vertragsgegenstand und Leistungsbeschreibung</h2>
      <p>
        (1) Der Anbieter stellt dem Kunden virtuelle Server (KVM) mit den in
        der jeweiligen Tarif- oder Konfiguratorauswahl beschriebenen
        Ressourcen (vCores, Arbeitsspeicher, NVMe-Speicher, Netzwerkport) zur
        Verfügung. Die Server werden in Rechenzentren in Deutschland betrieben.
      </p>
      <p>
        (2) Jeder Tarif umfasst eine IPv4-Adresse, einen 1-Gbit/s-Port sowie
        eine grundlegende DDoS-Filterung. Zwei Backup-Slots pro Server werden
        als unentgeltliche Zusatzleistung bereitgestellt; für deren Inhalt ist
        der Kunde verantwortlich.
      </p>
      <p>
        (3) Der Kunde erhält vollen Root- bzw. Administrator-Zugriff. Der
        Anbieter schuldet keine Verwaltung der auf dem Server installierten
        Software, sofern nicht ausdrücklich anders vereinbart.
      </p>

      <h2>§ 3 Vertragsschluss, Laufzeit und Verlängerung</h2>
      <p>
        (1) Die Darstellung der Tarife auf der Website stellt kein bindendes
        Angebot dar. Der Kunde gibt mit Absenden des Bestellformulars ein
        verbindliches Angebot ab; der Vertrag kommt mit Bestätigung durch den
        Anbieter bzw. mit Bereitstellung des Servers zustande.
      </p>
      <p>
        (2) Server werden im Voraus für einen Zeitraum von 30 bis 365 Tagen
        bereitgestellt. Es besteht <strong>kein Abonnement</strong> und keine
        automatische Verlängerung. Nach Ablauf des bezahlten Zeitraums wird der
        Server gestoppt.
      </p>
      <p>
        (3) Verlängert der Kunde innerhalb von 7 Tagen nach Ablauf, wird der
        Server mit unveränderten Daten fortgesetzt. Nach Ablauf dieser Frist
        ist der Anbieter berechtigt, den Server und die darauf gespeicherten
        Daten unwiederbringlich zu löschen.
      </p>

      <h2>§ 4 Preise und Zahlung</h2>
      <p>
        (1) Es gelten die zum Zeitpunkt der Bestellung auf der Website
        ausgewiesenen Preise; alle Preise verstehen sich inklusive der
        gesetzlichen Umsatzsteuer.
      </p>
      <p>
        (2) Die Zahlung erfolgt im Voraus über die auf der Website angebotenen
        Zahlungsarten (u. a. Kreditkarte, PayPal, SEPA-Überweisung,
        Kryptowährungen) durch Aufladung des Kundenguthabens. Der Server wird
        erst nach Zahlungseingang provisioniert.
      </p>
      <p>
        (3) Guthaben ist nicht verzinslich. Eine Auszahlung von Guthaben
        erfolgt nur im Rahmen gesetzlicher Ansprüche oder nach freiwilliger
        Vereinbarung.
      </p>

      <h2>§ 5 Pflichten des Kunden</h2>
      <p>
        (1) Der Kunde sichert zu, dass die bei der Bestellung gemachten Angaben
        zutreffend sind, und hält seine Zugangsdaten geheim.
      </p>
      <p>
        (2) Der Kunde verpflichtet sich, den Server nicht für rechtswidrige
        Zwecke zu nutzen. Insbesondere untersagt sind: Verbreitung rechts-
        oder jugendgefährdender Inhalte, Versand von Spam, Angriffe auf fremde
        Systeme (u. a. DDoS, Scans, Botnetze), das Betreiben von Diensten zur
        Umgehung von Rechtsschutzmaßnahmen sowie Urheberrechtsverletzungen.
      </p>
      <p>
        (3) Der Kunde ist für die Sicherung seiner Daten selbst verantwortlich.
        Bereitgestellte Backup-Slots entbinden nicht von der Pflicht zur
        eigenen Datensicherung außerhalb des Servers.
      </p>

      <h2>§ 6 Missbrauch und Sperrung</h2>
      <p>
        Bei begründetem Verdacht rechtswidriger Nutzung, bei akuten
        Sicherheitsvorfällen oder bei Verstößen gegen § 5 ist der Anbieter
        berechtigt, Server vorübergehend zu sperren oder den Vertrag
        fristlos zu kündigen. Der Kunde wird über die Sperrung und deren Grund
        unverzüglich informiert, soweit dies rechtlich zulässig ist.
      </p>

      <h2>§ 7 Verfügbarkeit und Haftung</h2>
      <p>
        (1) Der Anbieter bemüht sich um eine möglichst hohe Verfügbarkeit,
        garantiert jedoch keinen ununterbrochenen Betrieb. Wartungsarbeiten
        werden nach Möglichkeit angekündigt.
      </p>
      <p>
        (2) Der Anbieter haftet unbeschränkt bei Vorsatz und grober
        Fahrlässigkeit sowie bei Verletzung von Leben, Körper und Gesundheit.
        Bei einfacher Fahrlässigkeit haftet der Anbieter nur bei Verletzung
        wesentlicher Vertragspflichten, begrenzt auf den vertragstypischen,
        vorhersehbaren Schaden.
      </p>
      <p>
        (3) Für Datenverluste haftet der Anbieter nur, soweit der Verlust auch
        bei ordnungsgemäßer Datensicherung durch den Kunden eingetreten wäre.
      </p>

      <h2>§ 8 Widerrufsrecht</h2>
      <p>
        Verbrauchern steht grundsätzlich ein gesetzliches Widerrufsrecht zu.
        Es gelten die Regelungen der gesonderten{" "}
        <a href="/widerruf" className="text-aurora-300 underline">
          Widerrufsbelehrung
        </a>
        . Für digitale Inhalte und sofort bereitgestellte Dienstleistungen
        erlischt das Widerrufsrecht vorzeitig, wenn der Kunde ausdrücklich
        zugestimmt hat, dass mit der Vertragserfüllung vor Ablauf der
        Widerrufsfrist begonnen wird.
      </p>

      <h2>§ 9 Schlussbestimmungen</h2>
      <p>
        (1) Es gilt das Recht der Bundesrepublik Deutschland unter Ausschluss
        des UN-Kaufrechts.
      </p>
      <p>
        (2) Sollten einzelne Bestimmungen dieser AGB unwirksam sein, bleibt
        die Wirksamkeit der übrigen Bestimmungen unberührt.
      </p>
      <p>
        (3) Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung bereit; der Anbieter ist nicht verpflichtet und
        nicht bereit, an Streitbeilegungsverfahren vor einer
        Verbraucherschlichtungsstelle teilzunehmen.
      </p>
    </LegalPage>
  );
}
