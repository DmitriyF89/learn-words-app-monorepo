import { Injectable } from "@nestjs/common";

@Injectable()
export class DateService {
  getCurrentDateString() {
    return new Date().toISOString().split('T')[0];
  }

  getNextDateString(date: string, days: number) {
    const initialDate = new Date(date);
    initialDate.setDate(initialDate.getDate() + days);

    return initialDate.toISOString().split('T')[0];
  }

  isFirstDateEqualsOrBefore(firstDate: string, secondDate: string) {
    return new Date(firstDate) <= new Date(secondDate);
  }
}