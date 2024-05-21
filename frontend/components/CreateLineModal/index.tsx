"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  TextField,
  CircularProgress,
} from "@mui/material";
import { useFormik } from "formik";
import React, { Fragment } from "react";
import { Plans } from "@/constants";
import { CreateLineParams } from "@/interfaces/Requests";
import * as yup from "yup";

interface ICreateLineModal {
  open: boolean;
  handleClose: () => void;
  onSubmit: (values: CreateLineParams) => Promise<void>;
  loading: boolean;
}

const validationSchema = yup.object().shape({
  email: yup
    .string()
    .email("O formato de email está incorreto")
    .required("O email é obrigatório"),
  ddd: yup
    .number()
    .positive()
    .integer()
    .required()
    .min(10, "O número do DDD não pode ser menor que 10")
    .max(99, "O número do DDD não pode ser maior que 99"),
  plan: yup.number().required().min(1).max(4),
});

const CreateLineModal: React.FC<ICreateLineModal> = ({
  open,
  handleClose,
  onSubmit: handleSubmit,
  loading,
}) => {
  const formik = useFormik({
    initialValues: {
      email: "",
      ddd: "",
      plan: 1,
    },
    validationSchema: validationSchema,
    async onSubmit(values, form) {
      await handleSubmit(values);
      form.resetForm();
    },
  });

  return (
    <Fragment>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Criar nova linha telefônica</DialogTitle>
        <DialogContent>
          <DialogContentText>
            Preencha as informações abaixo para criar uma nova linha telefônica
          </DialogContentText>
          <Stack gap={2} marginTop="32px">
            <TextField
              role="email"
              required
              id="email"
              name="email"
              label="Email"
              type="email"
              fullWidth
              value={formik.values.email}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              helperText={formik.touched.email && formik.errors.email}
              variant="outlined"
            />
            <TextField
              required
              role="ddd"
              id="ddd"
              name="ddd"
              label="DDD"
              type="number"
              fullWidth
              variant="outlined"
              value={formik.values.ddd}
              onBlur={formik.handleBlur}
              helperText={formik.touched.ddd && formik.errors.ddd}
              onChange={formik.handleChange}
            />
            <FormControl fullWidth>
              <InputLabel id="planLabel">Plano</InputLabel>
              <Select
                labelId="planLabel"
                id="plan"
                name="plan"
                label="Plano"
                fullWidth
                variant="outlined"
                value={formik.values.plan}
                onChange={formik.handleChange}
              >
                {Plans.map((plan) => (
                  <MenuItem key={plan.id} value={plan.id}>
                    {plan.name}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            onClick={() => {
              handleClose();
              formik.resetForm();
            }}
            variant="outlined"
            sx={{ width: "150px" }}
          >
            Voltar
          </Button>
          <Button
            type="submit"
            variant="contained"
            onClick={() => formik.handleSubmit()}
            sx={{ width: "150px" }}
            disabled={!formik.dirty || !formik.isValid}
          >
            {loading ? (
              <CircularProgress size={24} color="secondary" />
            ) : (
              "Criar linha"
            )}
          </Button>
        </DialogActions>
      </Dialog>
    </Fragment>
  );
};

export default CreateLineModal;
