# Architektur und Datenmodell

## Komponenten

**Graph**  
Einer der wichtigsten UI-Bausteine ist der Graph, auf dem Life die gemessene Daten angezeigt werden. Um den Graph zu bekommen, wird für jeden Punkt ein STA/LTA-Algorithmus verwendet, um Charakteristische Funktion anzuzeigen, die die Platzierung jedes Punktes auf dem Grapg feststellt.

**"Export" Button**  
Die Export Button erscheint nur, wenn das Gerät ein Erdbeben erkennt, aka wenn der Wert von Daten einen Trigger Point überschneidet.

**Optional: "Send on server" Button**  
Beim Klick auf dieses Button wird der Graph, der ein Erdbeben aufgenommen hat, an einen Server automatisch geschickt. Diese Funktionalität implementiere ich, wenn ich die obige beide UI-Bausteine + richtige Interface fertighabe und Zeit noch übrig habe.
