# Architektur und Datenmodell

## Komponenten

**Graph**  
Der Graph ist ein zentraler UI-Baustein der App. Er zeigt die live gemessenen Rohdaten des Accelerometer-Sensors an. Zur Erdbebendetektion wird intern eine charakteristische Funktion verwendet, die aus den Rohdaten mithilfe von STA und LTA berechnet wird. Diese Funktion dient nur als Hilfsfunktion und ist für den User nicht direkt relevant. Überschreitet der STA/LTA-Wert einen definierten Trigger-Schwellwert, wird die entsprechende Aufnahme im Rohdaten-Graphen als mögliches Erdbeben markiert.
**"Export" Button**  
Der Export-Button erscheint nur, wenn das Gerät ein mögliches Erdbeben erkennt, also wenn die charakteristische Funktion den Trigger-Schwellwert überschreitet. Beim Klick auf den Button werden die aufgezeichneten Rohdaten bzw. der zugehörige Graph lokal auf dem Gerät gespeichert.

**Optional: "Send on server" Button**  
Beim Klick auf diesen Button werden die aufgezeichneten Erdbebendaten an einen Server gesendet. Diese Funktion wird optional implementiert, falls nach der Umsetzung des Graphen, der Detektionslogik und des Interfaces noch genügend Zeit bleibt.
