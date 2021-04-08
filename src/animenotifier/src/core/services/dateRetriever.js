module.exports = class DateRetriever {
    static getToday(){
        var now = new Date();
        var day = now.getUTCDate();
        var month = now.getUTCMonth();
        var year = now.getUTCFullYear();
        var seconds = now.getUTCSeconds();
        var milliseconds = now.getUTCMilliseconds();
        var hours = now.getUTCHours();
        var minutes = now.getUTCMinutes();
        return new Date(Date.UTC(year, month, day, hours, minutes, seconds, milliseconds));
    }
}