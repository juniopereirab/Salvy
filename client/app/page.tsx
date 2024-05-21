"use client";
import Image from "next/image";
import { Button, Stack, Typography } from "@mui/material";
import { useCallback, useEffect, useState } from "react";
import { createLine, getLines } from "@/services/line.service";
import { ILine } from "@/interfaces/Line";
import LineItem from "@/components/LineItem";
import CreateLineModal from "@/components/CreateLineModal";
import { CreateLineParams } from "@/interfaces/Requests";
import Snackbar from "@/components/Snackbar";
import { formatPhoneNumber } from "@/utils";
import { socket } from "./socket";
import { Replay } from "@mui/icons-material";

export default function Home() {
  const [open, setOpen] = useState<boolean>(false);
  const [lines, setLines] = useState<ILine[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [isConnected, setIsConnected] = useState(false);
  const [transport, setTransport] = useState("N/A");
  const [newLines, setNewLines] = useState<number>(0);

  const [showSnackbar, setShowSnackbar] = useState<{
    open: boolean;
    message: string;
    severity: "success" | "info";
  }>({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (socket.connected) {
      onConnect();
    }

    function onConnect() {
      setIsConnected(true);
      setTransport(socket.io.engine.transport.name);
      console.log("conectou", socket.io.engine.transport.name);

      socket.io.engine.on("upgrade", (transport) => {
        setTransport(transport.name);
      });
    }

    function onDisconnect() {
      setIsConnected(false);
      setTransport("N/A");
    }

    socket.on("connect", onConnect);
    socket.on("disconnect", onDisconnect);
    socket.on("newPendingLines", (createdLines) => {
      setNewLines(createdLines);
    });

    return () => {
      socket.off("connect", onConnect);
      socket.off("disconnect", onDisconnect);
    };
  }, []);

  const getLinesCb = useCallback(async () => {
    const response = await getLines();
    setLines(response);
  }, []);

  const onSubmit = async (values: CreateLineParams) => {
    setLoading(true);
    const response = await createLine({
      email: values.email,
      ddd: values.ddd,
      plan: values.plan,
    });

    if (!response.pending) {
      setShowSnackbar((prevState) => ({
        ...prevState,
        message: `Seu número foi criado com sucesso, seu novo numero é ${formatPhoneNumber(
          response.phoneNumber
        )}`,
        open: true,
      }));
      getLinesCb();
    } else {
      setShowSnackbar((prevState) => ({
        ...prevState,
        message: `Seu novo número será enviado por email assim que ele for criado`,
        open: true,
        severity: "info",
      }));
    }

    setLoading(false);
    setOpen(false);
  };

  useEffect(() => {
    getLinesCb();
  }, [getLinesCb]);

  const handleSnackbarClose = (
    event?: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }

    setShowSnackbar((prevState) => ({
      ...prevState,
      open: false,
      message: "",
    }));
  };
  return (
    <Stack
      justifyContent="center"
      alignItems="center"
      width="100%"
      height="100vh"
      gap={5}
    >
      <Image
        src="/logo.svg"
        alt="logo"
        width={200}
        height={100}
        priority={true}
      />
      <Stack
        justifyContent="center"
        alignItems="center"
        gap={2}
        direction="row"
      >
        <Stack
          justifyContent="space-between"
          height="600px"
          alignItems="flex-end"
        >
          <Stack gap={2}>
            <Button
              variant="contained"
              color="secondary"
              sx={{ width: "300px" }}
              onClick={() => {
                setShowSnackbar((prevState) => ({
                  ...prevState,
                  open: false,
                }));
                setOpen(true);
              }}
            >
              Criar linha telefônica
            </Button>
            {newLines > 0 && (
              <Stack gap={1}>
                <Typography fontSize="14px">
                  Novas linhas estão disponíveis
                </Typography>
                <Button
                  variant="outlined"
                  color="info"
                  sx={{ width: "300px" }}
                  onClick={() => window.location.reload()}
                >
                  Atualizar <Replay />
                </Button>
              </Stack>
            )}
          </Stack>
          <Image
            src="/line_list.svg"
            alt="login"
            width={500}
            height={450}
            priority={true}
          />
        </Stack>
        <Stack
          width="600px"
          height="600px"
          border="1px solid black"
          sx={{ background: "white" }}
          borderRadius="4px"
          overflow="auto"
        >
          {lines.length === 0 && (
            <Typography textAlign="center" mt="40px">
              Nenhuma linha foi encontrada!
            </Typography>
          )}
          {lines.length > 0 && (
            <>
              {lines.map((line, index) => (
                <LineItem index={index + 1} line={line} key={index} />
              ))}
            </>
          )}
        </Stack>
      </Stack>
      <CreateLineModal
        handleClose={() => setOpen(false)}
        open={open}
        onSubmit={onSubmit}
        loading={loading}
      />
      <Snackbar {...showSnackbar} handleClose={handleSnackbarClose} />
    </Stack>
  );
}
