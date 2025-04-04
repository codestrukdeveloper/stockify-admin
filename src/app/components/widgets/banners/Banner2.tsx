"use client";
import { CardContent, Typography, Button } from "@mui/material";
import ParentCard from "../../shared/ParentCard";
import { Box } from "@mui/material";import Image from "next/image";

import NotificationCode from "./code/NotificationCode";

const Banner2 = () => {
  return (
    <ParentCard title="Notification" codeModel={<NotificationCode />}>
      <CardContent sx={{ p: "30px" }}>
        <Typography
          variant="subtitle1"
          textAlign="center"
          mb={2}
          textTransform="uppercase"
          color="textSecondary"
        >
          Level Up
        </Typography>
        <Box textAlign="center">
          <Image
            src={"/images/backgrounds/gold.png"}
            width={150}
            height={150}
            alt="star"
            style={{ width: "150px" }}
          />

          <Typography variant="h5">You reach all Notifications</Typography>
          <Typography variant="subtitle1" color="textSecondary" mt={1} mb={2}>
            Congratulations,
            <br /> Tap to continue next task.
          </Typography>

          <Button color="primary" variant="contained" size="large">
            Yes, Got it!
          </Button>
        </Box>
      </CardContent>
    </ParentCard>
  );
};

export default Banner2;
