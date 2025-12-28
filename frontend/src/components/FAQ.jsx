import { useState } from "react";

const faqs = [
  {
    question: "How does the credit system work?",
    answer:
      "Each file conversion uses a certain number of credits based on the file type and conversion complexity. Simple image conversions use fewer credits, while document conversions may use more.",
  },
  {
    question: "What happens when I run out of credits?",
    answer:
      "Once your credits are exhausted, you can upgrade your plan or wait until your monthly credits reset. You’ll never be charged automatically without your consent.",
  },
  {
    question: "Do I need to create an account to convert files?",
    answer:
      "No. You can start converting files instantly without signing up. An account is only required when you want to purchase a plan or track your usage.",
  },
  {
    question: "Are my files secure?",
    answer:
      "Yes. All files are processed securely and are automatically deleted shortly after conversion. We never store or share your files.",
  },
  {
    question: "Can I upgrade or downgrade my plan anytime?",
    answer:
      "Absolutely. You can change your plan at any time. Upgrades take effect immediately, and unused credits are preserved where applicable.",
  },
  {
    question: "Do credits expire?",
    answer:
      "Credits reset every billing cycle. Unused credits do not roll over to the next month unless you are on a custom enterprise plan.",
  },
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(null);

  return (
    <section className="relative bg-[#0B0B0F] py-28 text-white">
      <div className="mx-auto max-w-4xl px-6">

        {/* Heading */}
        <div className="mb-16 text-center">
          <h2 className="text-4xl font-semibold sm:text-5xl">
            Frequently Asked Questions
          </h2>
          <p className="mt-4 text-lg text-zinc-400">
            Everything you need to know before getting started
          </p>
        </div>

        {/* FAQ List */}
        <div className="space-y-4">
          {faqs.map((item, index) => (
            <FAQItem
              key={index}
              index={index}
              openIndex={openIndex}
              setOpenIndex={setOpenIndex}
              {...item}
            />
          ))}
        </div>
      </div>
    </section>
  );
}

function FAQItem({ question, answer, index, openIndex, setOpenIndex }) {
  const isOpen = index === openIndex;

  return (
    <div
      className={`rounded-2xl border transition ${
        isOpen
          ? "border-indigo-500/40 bg-white/10"
          : "border-white/10 bg-white/5"
      }`}
    >
      <button
        onClick={() => setOpenIndex(isOpen ? null : index)}
        className="flex w-full items-center justify-between px-6 py-5 text-left"
      >
        <span className="text-base font-medium">{question}</span>
        <span
          className={`text-xl transition ${
            isOpen ? "rotate-45 text-indigo-400" : "text-zinc-400"
          }`}
        >
          +
        </span>
      </button>

      <div
        className={`grid overflow-hidden transition-all duration-300 ${
          isOpen ? "grid-rows-[1fr]" : "grid-rows-[0fr]"
        }`}
      >
        <div className="overflow-hidden px-6 pb-5 text-sm text-zinc-400">
          {answer}
        </div>
      </div>
    </div>
  );
}
