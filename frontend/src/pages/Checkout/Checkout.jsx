import React, { useState } from "react";
import {
  Box,
  Stepper,
  Step,
  Typography,
  StepLabel,
  Container,
} from "@mui/material";
import Shipping from "./Shipping";
import Payment from "./Payment";
import OrderSummary from "./OrderSummary";
import Check from "@mui/icons-material/Check";
import { QontoStepIconRoot } from "./styles";

const steps = ["Shipping", "Payment", "Order Summary"];

const QontoStepIcon = (props) => {
  const { active, completed, className } = props;

  return (
    <QontoStepIconRoot ownerState={{ active }} className={className}>
      {completed ? (
        <Check className="QontoStepIcon-completedIcon" />
      ) : (
        <div className="QontoStepIcon-circle" />
      )}
    </QontoStepIconRoot>
  );
};

const Checkout = () => {
  const [activeStep, setActiveStep] = useState(0);

  const handleNext = () => {
    setActiveStep((prevActiveStep) => prevActiveStep + 1);
  };

  const handleBack = () => {
    setActiveStep((prevActiveStep) => prevActiveStep - 1);
  };

  return (
    <Box sx={{ width: "100%" }}>
      <Container maxWidth="md">
        <Stepper activeStep={activeStep} sx={{ marginBottom: 8 }}>
          {steps.map((label, index) => {
            const stepProps = {};
            const labelProps = {};

            return (
              <Step key={label} {...stepProps}>
                <StepLabel {...labelProps} StepIconComponent={QontoStepIcon}>
                  {label}
                </StepLabel>
              </Step>
            );
          })}
        </Stepper>
      </Container>
      {activeStep === steps.length ? (
        <>
          <Typography sx={{ mt: 2, mb: 1 }}>
            All steps completed - you&apos;re finished
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
            <Box sx={{ flex: "1 1 auto" }} />
          </Box>
        </>
      ) : (
        <>
          <Container maxWidth="md">
            {activeStep === 0 && (
              <Shipping
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                steps={steps}
              />
            )}
            {activeStep === 1 && (
              <Payment
                activeStep={activeStep}
                handleBack={handleBack}
                handleNext={handleNext}
                steps={steps}
              />
            )}
          </Container>
          {activeStep === 2 && (
            <OrderSummary
              activeStep={activeStep}
              handleBack={handleBack}
              handleNext={handleNext}
              steps={steps}
            />
          )}
        </>
      )}
    </Box>
  );
};

export default Checkout;
