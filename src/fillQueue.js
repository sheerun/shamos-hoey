import Event from './Event'
import {checkWhichEventIsLeft} from './compareEvents'

export function fillEventQueue (geojson, eventQueue) {
    if (geojson.type === 'Feature') geojson = geojson.geometry

    // standardise the input
    if (geojson.type === 'Polygon' || geojson.type === 'MultiLineString') geojson.coordinates = [geojson.coordinates]
    if (geojson.type === 'LineString') geojson.coordinates = [[geojson.coordinates]]

    for (let i = 0; i < geojson.coordinates[0].length; i++) {

        for (let ii = 0; ii < geojson.coordinates[0][i].length - 1; ii++) {

            const e1 = new Event(geojson.coordinates[0][i][ii])
            const e2 = new Event(geojson.coordinates[0][i][ii + 1])

            e1.otherEvent = e2;
            e2.otherEvent = e1;

            if (checkWhichEventIsLeft(e1, e2) > 0) {
                e2.isLeftEndpoint = true;
                e1.isLeftEndpoint = false
            } else {
                e1.isLeftEndpoint = true;
                e2.isLeftEndpoint = false
            }
            eventQueue.push(e1)
            eventQueue.push(e2)
        }
    }
}
