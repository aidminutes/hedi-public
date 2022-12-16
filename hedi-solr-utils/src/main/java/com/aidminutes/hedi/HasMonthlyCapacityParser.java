package com.aidminutes.hedi;

import java.util.Date;
import org.apache.lucene.queries.function.ValueSource;
import org.apache.solr.common.util.NamedList;
import org.apache.solr.search.FunctionQParser;
import org.apache.solr.search.SyntaxError;
import org.apache.solr.search.ValueSourceParser;

public class HasMonthlyCapacityParser extends ValueSourceParser {
  public HasMonthlyCapacityParser() {
  }

  @Override
  public void init(NamedList args) {
    super.init(args);
  }

  @Override
  public ValueSource parse(FunctionQParser fp) throws SyntaxError {
    String expectedDeliveryDateString = fp.parseArg();
    String deliveryDateFieldName = fp.parseArg();
    String capacityFieldName = fp.parseArg();

    Date expectedDeliveryDate = new Utils().getDate(expectedDeliveryDateString);
    // Adding DEBUG info to trace and Test
    NamedList<Object> debugInfo = new NamedList<Object>();
    debugInfo.add("expectedDeliveryDateString", expectedDeliveryDateString);
    debugInfo.add("deliveryDateFieldName", deliveryDateFieldName);
    debugInfo.add("capacityFieldName", capacityFieldName);
    fp.addDebugInfo(debugInfo);

    return new HasMonthlyCapacityValueSource(expectedDeliveryDate,
        deliveryDateFieldName, capacityFieldName);
  }
}
