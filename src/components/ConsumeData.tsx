import Grid from "@mui/material/Grid2";
import { useEffect, useState } from "react";
import { IMeta } from "../services/types/ProductInterface.tsx";
import StatCardSummary from "../pages/admin/components/home/card/StatCardSummary.tsx";
import { IOrderSummary } from "../services/types/OrderInterface.tsx";

export interface IConsumeDataGrid {
  title: string;
  value: string;
  interval: string;
  trend: "up" | "down" | "neutral";
  data: Array<number>;
}

export interface IConsumeData {
  meta: IMeta;
  orderSummary: IOrderSummary;
}

const ConsumeData = (props: IConsumeData) => {
  const [consumeData, setConsumeData] = useState<IConsumeDataGrid[]>([]);

  useEffect(() => {
    if (props.meta) {
      const mockData: Array<IConsumeDataGrid> = [
        {
          title: "Total items",
          value: `${props.meta.totalItems}`,
          interval: "",
          trend: "neutral",
          data: [],
        },
        {
          title: "New items",
          value: `${props.meta.totalThirtyDays}`,
          interval: "Last 30 days",
          trend: "up",
          data: [],
        },
      ];
      setConsumeData(mockData);
    }
  }, [props.meta]);

  return (
    <Grid
      container
      spacing={2}
      columns={12}
      sx={{ mb: (theme) => theme.spacing(2) }}
    >
      {consumeData.map((card, index) => (
        <Grid key={index} size={{ xs: 12, sm: 6, lg: 3 }}>
          <StatCardSummary {...card} />
        </Grid>
      ))}
    </Grid>
  );
};

export default ConsumeData;
