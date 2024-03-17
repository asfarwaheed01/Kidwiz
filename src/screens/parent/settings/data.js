const BillingDetails = {
  title: 'Pro Plan $109/mo',
  daysRemaining: '24 days remaining',
  card: {
    exp: '12/2024',
    lastFour: '1234',
  },
  billingMail: 'billing@gmail.com'
}

const BillingHistory = [
  { title: 'Pro Plan', amount: 'USD $109', date: 'Dec 1, 2022', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'Nov 1, 2022', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'Dec 1, 2022', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'Jan 1, 2023', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'Feb 1, 2023', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'Mar 1, 2023', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'Apr 1, 2023', isSelected: false },
  { title: 'Pro Plan', amount: 'USD $109', date: 'May 1, 2023', isSelected: false },
]

export {
  BillingDetails,
  BillingHistory,
}