import type { Metadata } from "next";
import { LegalPage } from "@/components/legal/legal-page";
import { site } from "@/config/site";

export const metadata: Metadata = {
  title: "Widerrufsbelehrung",
  description: `Widerrufsbelehrung von ${site.name} für Verbraucher.`,
};

export default function WiderrufPage() {
  return (
    <LegalPage
      title="Widerrufsbelehrung"
      subtitle={`Stand: ${new Date().toLocaleDateString("de-DE")} · Mustertext – bitte mit deinen Unternehmensdaten ergänzen und rechtlich prüfen lassen.`}
    >
      <h2>1. Widerrufsrecht</h2>
      <p>
        Du hast das Recht, binnen vierzehn Tagen ohne Angabe von Gründen
        diesen Vertrag zu widerrufen. Die Widerrufsfrist beträgt vierzehn
        Tage ab dem Tag des Vertragsschlusses.
      </p>
      <p>
        Um dein Widerrufsrecht auszuüben, musst du uns
        ({site.name} – [Firmenname eintragen], [Adresse eintragen], E-Mail:{" "}
        {site.supportEmail}) mittels einer eindeutigen Erklärung (z. B. ein
        mit der Post versandter Brief oder eine E-Mail) über deinen Entschluss,
        diesen Vertrag zu widerrufen, informieren. Du kannst dafür das unten
        stehende Muster-Widerrufsformular verwenden, das jedoch nicht
        vorgeschrieben ist.
      </p>
      <p>
        Zur Wahrung der Widerrufsfrist reicht es aus, dass du die Mitteilung
        über die Ausübung des Widerrufsrechts vor Ablauf der Widerrufsfrist
        absendest.
      </p>

      <h2>2. Folgen des Widerrufs</h2>
      <p>
        Wenn du diesen Vertrag widerrufst, haben wir dir alle Zahlungen, die
        wir von dir erhalten haben, einschließlich der Lieferkosten (mit
        Ausnahme der zusätzlichen Kosten, die sich daraus ergeben, dass du
        eine andere Art der Lieferung als die von uns angebotene, günstigste
        Standardlieferung gewählt hast), unverzüglich und spätestens binnen
        vierzehn Tagen ab dem Tag zurückzuzahlen, an dem die Mitteilung über
        deinen Widerruf dieses Vertrags bei uns eingegangen ist. Für diese
        Rückzahlung verwenden wir dasselbe Zahlungsmittel, das du bei der
        ursprünglichen Transaktion eingesetzt hast, es sei denn, mit dir wurde
        ausdrücklich etwas anderes vereinbart; in keinem Fall werden dir wegen
        dieser Rückzahlung Entgelte berechnet.
      </p>
      <p>
        Hast du verlangt, dass die Dienstleistung während der Widerrufsfrist
        beginnen soll, so hast du uns einen angemessenen Betrag zu zahlen, der
        dem Anteil der bis zu dem Zeitpunkt, zu dem du uns von der Ausübung
        des Widerrufsrechts hinsichtlich dieses Vertrags unterrichtest,
        bereits erbrachten Dienstleistungen im Vergleich zum Gesamtumfang der
        im Vertrag vorgesehenen Dienstleistungen entspricht.
      </p>

      <h2>3. Vorzeitiges Erlöschen des Widerrufsrechts</h2>
      <p>
        Das Widerrufsrecht erlischt vorzeitig, wenn wir mit der Ausführung
        des Vertrags (Bereitstellung des Servers) auf deinen ausdrücklichen
        Wunsch hin bereits vor Ablauf der Widerrufsfrist begonnen haben und
        du bestätigt hast, dass du Kenntnis davon hast, dass du durch diese
        Zustimmung mit Beginn der Vertragserfüllung dein Widerrufsrecht
        verlierst. Die entsprechende Einwilligung holen wir im Bestellprozess
        ein.
      </p>

      <h2>4. Muster-Widerrufsformular</h2>
      <p>
        (Wenn du den Vertrag widerrufen willst, kannst du folgenden Text
        verwenden und an uns senden:)
      </p>
      <ul>
        <li>An: {site.name} – [Firmenname, Adresse, E-Mail eintragen]</li>
        <li>
          Hiermit widerrufe(n) ich/wir den von mir/uns abgeschlossenen Vertrag
          über die Erbringung der folgenden Dienstleistung: [z. B. „VPS-Tarif …“]
        </li>
        <li>Bestellt am: [Datum]</li>
        <li>Bestellnummer: [falls vorhanden]</li>
        <li>Name des/der Verbraucher(s):</li>
        <li>Anschrift des/der Verbraucher(s):</li>
        <li>Datum, ggf. Unterschrift:</li>
      </ul>
    </LegalPage>
  );
}
