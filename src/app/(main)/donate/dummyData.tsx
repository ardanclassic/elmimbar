interface BankAccount {
  bankName: string;
  accountNumber: string;
  accountHolder: string;
}

interface DonationInfo {
  bankAccounts: BankAccount[];
  qrisImage?: string;
}

export const dummyDonationInfo: DonationInfo = {
  bankAccounts: [
    {
      bankName: "Bank Mandiri",
      accountNumber: "123-456-7890123",
      accountHolder: "Masjid Al-Ikhlas",
    },
    {
      bankName: "BNI Syariah",
      accountNumber: "987-654-3210987",
      accountHolder: "Yayasan Masjid Al-Ikhlas",
    },
  ],
};
