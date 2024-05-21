import { formatPhoneNumber } from '@/utils'; 

describe('formatPhoneNumber', () => {
    test('Deve formatar corretamente um número de telefone válido', () => {
        const phoneNumber = '+5511123456789';

        const formattedNumber = formatPhoneNumber(phoneNumber);

        expect(formattedNumber).toBe('+55 (11) 12345-6789');
    });

    test('Deve retornar uma string vazia para um número de telefone inválido', () => {
        const invalidPhoneNumber = '123';

        const formattedNumber = formatPhoneNumber(invalidPhoneNumber);

        expect(formattedNumber).toBe('');
    });
});