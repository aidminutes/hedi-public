package com.aidminutes.hedi;

import java.util.Date;
import org.apache.solr.util.DateMathParser;
import java.text.SimpleDateFormat;
import java.util.Calendar;

public class Utils {
  public Date getDate(String arg) {
    if (arg == null) {
      return null;
    }
    if (arg.startsWith("NOW") || arg.length() > 1 && Character.isDigit(arg.charAt(1))) {
      Date now = null;
      return DateMathParser.parseMath(now, arg);
    }
    return null;
  }

  public Date getMonthBegin(Date date) {
    SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat partialDateFormat = new SimpleDateFormat("yyyy-MM-");
    try {
      Date monthBegin = fullDateFormat.parse(partialDateFormat.format(date) + "01");
      return monthBegin;
    } catch (Exception e) {
      return null;
    }
  }

  public Date getMonthEnd(Date date) {
    SimpleDateFormat fullDateFormat = new SimpleDateFormat("yyyy-MM-dd");
    SimpleDateFormat partialDateFormat = new SimpleDateFormat("yyyy-MM-");
    try {
      Integer lastDayOfMonth = Calendar.getInstance().getActualMaximum(Calendar.DAY_OF_MONTH);
      Date monthEnd = fullDateFormat.parse(partialDateFormat.format(date)
          + (lastDayOfMonth < 10 ? "0" + lastDayOfMonth.toString() : lastDayOfMonth.toString()));
      return monthEnd;
    } catch (Exception e) {
      return null;
    }
  }
}
