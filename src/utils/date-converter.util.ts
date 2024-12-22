import * as moment from "moment-timezone";

export class DateConverter {
  static convertDates(
    data: any,
    toDateObject: boolean = false,
    timeOnly: boolean = false
  ): any {
    if (data instanceof Date) {
      if (timeOnly) {
        return moment(data).tz("Asia/Vientiane").format("HH:mm:ss");
      }
      return toDateObject
        ? moment(data).tz("Asia/Vientiane").toDate()
        : moment(data).tz("Asia/Vientiane").format();
    }

    if (Array.isArray(data)) {
      return data.map((item) =>
        this.convertDates(item, toDateObject, timeOnly)
      );
    }

    if (typeof data === "object" && data !== null) {
      const newObj: any = {};
      for (const key in data) {
        if (key === "day" || key === "month" || key === "year") {
          // Handle day, month, and year if needed
          newObj[key] = data[key];
        } else {
          newObj[key] = this.convertDates(
            data[key],
            toDateObject,
            key === "created_time" ? true : timeOnly
          );
        }
      }
      return newObj;
    }

    return data;
  }

  static toVientianeDateObject(
    date: Date | string | number = new Date()
  ): Date {
    return moment(date).tz("Asia/Vientiane").toDate();
  }

  static formatToVientianeString(
    date: Date | string | number = new Date()
  ): string {
    return moment(date).tz("Asia/Vientiane").format();
  }

  static getCurrentDateParts(): { day: number; month: number; year: number } {
    const now = moment().tz("Asia/Vientiane");
    return {
      day: now.date(),
      month: now.month() + 1,
      year: now.year(),
    };
  }
}
