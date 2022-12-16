package com.aidminutes.hedi;

import java.util.Date;
import org.apache.lucene.queries.function.ValueSource;
import org.apache.solr.common.util.NamedList;
import org.apache.solr.search.FunctionQParser;
import org.apache.solr.search.SyntaxError;
import org.apache.solr.search.ValueSourceParser;

public class IntersectRatioParser extends ValueSourceParser {
  public IntersectRatioParser() {
  }

  @Override
  public void init(NamedList args) {
    super.init(args);
    // NOTE: if there is need to have configurations in solrconfig.xml use this
    // args:
    // private int ignorableDays = 0;
    // private static enum Params {
    // ignorableDays,
    // }
    //
    // Object ignorableDaysObject = args.get(Params.ignorableDays.name());
    //
    // if (ignorableDaysObject != null) this.ignorableDays =
    // ((int) ignorableDaysObject);
  }

  @Override
  public ValueSource parse(FunctionQParser fp) throws SyntaxError {
    String startDateString = fp.parseArg();
    String endDateString = fp.parseArg();
    String fieldName = fp.parseArg();
    Utils utils = new Utils();
    Date startDate = utils.getDate(startDateString);
    Date endDate = utils.getDate(endDateString);

    // Adding DEBUG info to trace and Test
    NamedList<Object> debugInfo = new NamedList<Object>();
    debugInfo.add("startDateString", startDateString);
    debugInfo.add("endDateString", endDateString);
    debugInfo.add("fieldName", fieldName);
    fp.addDebugInfo(debugInfo);

    return new IntersectRatioValueSource(startDate, endDate, fieldName);
  }

  // public ValueSource getValueSource(FunctionQParser fp, String arg) {
  // if (arg == null) {
  // return null;
  // }
  // SchemaField f = fp.getReq().getSchema().getField(arg);
  // return f.getType().getValueSource(f, fp);
  // }
}
