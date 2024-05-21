export const formatPhoneNumber = (number: string): string => {
    // Verifica se o número é válido
    if (!number.match(/^\+\d{13}$/)) {
        return "";
    }

    // Extrai o código do país, o código de área e o número principal
    const codigoPais = number.slice(0, 3);
    const codigoArea = number.slice(3, 5);
    const numberPrincipal = number.slice(5, 10);
    const numberSecondary = number.slice(10);

    // Formata o número de telefone
    const numberFormatted = `${codigoPais} (${codigoArea}) ${numberPrincipal}-${numberSecondary}`;

    return numberFormatted;
}