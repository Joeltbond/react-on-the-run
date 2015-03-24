// Clock Class
// -----------
// A wrapper class for window.setInterval that uses
// given beats per minute and note values as the basis for timing
// for callback invocation.
export default class Clock {
    /**
     * @constructor
     *
     * Converts given note value and beats per minute (bpm) value
     * to an interval in milliseconds and stores it as a property on
     * a newly created clock object.
     *
     * @param {number} noteType Aj number representing the note
     * value. E.g. 4 for quarter notes, 8 for eighth
     * notes, 1 for whole notes.
     *
     * @param {number} bpm Beats Per minute.
     * */
    constructor(noteType, bpm) {
        this.speed = 60000/(bpm * (noteType / 4));
    }

    /**
     * Repeatedly invoke a callback at the speed calculated by
     * th constructor.
     *
     * @param {callback} callback The function to be invoked
     * on the beat.
     */
    start(callback) {
        this.timer = window.setInterval(callback, this.speed);
    }


    /**
     * Clear the timer.
     * */
    stop() {
        window.clearInterval(this.timer)
    }
}
