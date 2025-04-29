import { useState } from 'react';
import { ChevronDown } from 'lucide-react';

// FAQ data
const faqs = [
  {
    question: 'What is InternFlow?',
    answer:
      'InternFlow is a platform that connects students with internship opportunities and helps companies find talented interns. We streamline the internship search and application process.',
  },
  {
    question: 'How do I apply for an internship?',
    answer:
      'To apply for an internship, first create an account and complete your profile. Then browse available opportunities and click the "Apply" button on any internship that interests you. You can track your applications in your dashboard.',
  },
  {
    question: 'Can I post internship opportunities?',
    answer:
      'Yes! Companies can post internship opportunities by creating an employer account. Once verified, you can post opportunities, review applications, and manage your internship listings.',
  },
  {
    question: 'Is the platform free to use?',
    answer:
      'Yes, InternFlow is completely free for both students and companies. We believe in making internship opportunities accessible to everyone.',
  },
  {
    question: 'How do I build my profile?',
    answer:
      'Your profile is your digital resume. Add your education, skills, experience, and a professional photo. A complete profile increases your chances of getting noticed by employers.',
  },
  {
    question: 'What types of internships are available?',
    answer:
      'We offer a wide range of internships across different fields including technology, business, marketing, design, and more. You can find both remote and on-site opportunities.',
  },
  {
    question: 'How can I contact support?',
    answer:
      'For any questions or issues, you can reach our support team through the contact form in your dashboard or email us at support@internflow.com. We typically respond within 24 hours.',
  },
];

const QAPage = () => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggleAccordion = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <main className="min-h-screen bg-gray-50">
      <div className="mx-auto max-w-[800px] px-4 py-8 md:px-6 lg:px-8">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-semibold text-gray-900 md:text-3xl">
            Frequently Asked <span className="text-[#92E3A9]">Questions</span>
          </h1>
          <p className="mt-2 text-sm text-gray-500">
            Find answers to common questions about InternFlow
          </p>
        </div>

        <div className="space-y-4">
          {faqs.map((faq, index) => (
            <div
              key={index}
              className="overflow-hidden rounded-lg border border-gray-200 bg-white shadow-sm transition-all duration-200 ease-in-out"
            >
              <button
                onClick={() => toggleAccordion(index)}
                className="flex w-full items-center justify-between px-4 py-5 sm:px-6"
              >
                <span className="text-left text-sm font-medium text-gray-900 sm:text-base">
                  {faq.question}
                </span>
                <ChevronDown
                  className={`h-5 w-5 text-gray-400 transition-transform duration-200 ${
                    openIndex === index ? 'rotate-180 text-[#92E3A9]' : ''
                  }`}
                />
              </button>
              <div
                className={`overflow-hidden transition-[max-height] duration-200 ease-in-out ${
                  openIndex === index ? 'max-h-96' : 'max-h-0'
                }`}
              >
                <div className="border-t border-gray-100 bg-gray-50 px-4 py-5 text-sm text-gray-600 sm:px-6">
                  {faq.answer}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Contact Section */}
        <div className="mt-12 rounded-lg border border-gray-200 bg-white p-6 text-center shadow-sm">
          <h2 className="text-lg font-medium text-gray-900">
            Still have questions?
          </h2>
          <p className="mt-2 text-sm text-gray-500">
            Can't find the answer you're looking for? Please contact our support
            team.
          </p>
          <button
            className="mt-4 rounded-lg bg-[#92E3A9] px-6 py-2.5 text-sm font-medium text-white transition-colors hover:bg-[#7ED196] focus:ring-2 focus:ring-[#92E3A9] focus:ring-offset-2 focus:outline-none"
            onClick={() =>
              (window.location.href = 'mailto:bouroumanamoundher@gmail.com')
            }
          >
            Contact Support
          </button>
        </div>
      </div>
    </main>
  );
};

export default QAPage;

