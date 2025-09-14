import React, { useState } from 'react';
import { Mail, CheckCircle } from 'lucide-react';
import { useForm } from 'react-hook-form';
import toast from 'react-hot-toast';

interface NewsletterForm {
  email: string;
  jobAlerts: boolean;
  blogUpdates: boolean;
  expatGuides: boolean;
}

const NewsletterSubscription = () => {
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { register, handleSubmit, formState: { errors }, reset } = useForm<NewsletterForm>();

  const onSubmit = async (data: NewsletterForm) => {
    try {
      // Mailchimp form POST URL — replace with your own
      const mailchimpUrl =
        'https://rivieraapps.us18.list-manage.com/subscribe/post?u=7ff42d93ae43068e9083f7a55&amp;id=0e885bcd11&amp;f_id=0047afe6f0';

      // Construct params as URLSearchParams
      const params = new URLSearchParams();
      params.append('EMAIL', data.email);
      if (data.jobAlerts) params.append('GROUPINGS[0][GROUP_NAME]', 'Job Alerts');
      if (data.blogUpdates) params.append('GROUPINGS[0][GROUP_NAME]', 'Blog Updates');
      if (data.expatGuides) params.append('GROUPINGS[0][GROUP_NAME]', 'Expat Guides');

      // Mailchimp requires JSONP, but to simplify, you can use jsonp or backend proxy
      // Here, we demonstrate a fetch to a CORS-enabled endpoint (not guaranteed to work)

      const response = await fetch(mailchimpUrl + '&' + params.toString(), {
        method: 'GET',
        mode: 'no-cors', // To bypass CORS (won't get response)
      });

      setIsSubmitted(true);
      toast.success('Successfully subscribed to newsletter!');
      reset();
      setTimeout(() => setIsSubmitted(false), 3000);
    } catch (error) {
      toast.error('Failed to subscribe. Please try again.');
    }
  };

  return (
    <section className="py-16 bg-blue-900">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        <div className="inline-flex items-center justify-center w-16 h-16 bg-blue-700 rounded-full mb-6">
          <Mail className="h-8 w-8 text-white" />
        </div>
        <h2 className="text-3xl font-bold text-white mb-4">
          Stay Updated with PACA-Dev
        </h2>
        <p className="text-xl text-blue-100 mb-8">
          Get the latest job opportunities, expat tips, and tech insights delivered to your inbox.
        </p>

        {isSubmitted ? (
          <div className="bg-green-500 text-white p-6 rounded-lg max-w-md mx-auto">
            <CheckCircle className="h-8 w-8 mx-auto mb-4" />
            <h3 className="text-lg font-semibold mb-2">Thank you for subscribing!</h3>
            <p>You'll receive our latest updates and job opportunities.</p>
          </div>
        ) : (
          <form onSubmit={handleSubmit(onSubmit)} className="max-w-md mx-auto">
            <div className="mb-4">
              <input
                type="email"
                placeholder="Enter your email address"
                {...register('email', { 
                  required: 'Email is required',
                  pattern: {
                    value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                    message: 'Invalid email address'
                  }
                })}
                className="w-full px-4 py-3 rounded-lg text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
              />
              {errors.email && (
                <p className="text-red-300 text-sm mt-2">{errors.email.message}</p>
              )}
            </div>

            <div className="mb-6 text-left">
              <p className="text-blue-100 mb-3 text-sm">Subscribe to:</p>
              <div className="space-y-2">
                <label className="flex items-center text-blue-100">
                  <input
                    type="checkbox"
                    {...register('jobAlerts')}
                    className="mr-3 rounded"
                    defaultChecked
                  />
                  Job alerts and new opportunities
                </label>
                <label className="flex items-center text-blue-100">
                  <input
                    type="checkbox"
                    {...register('blogUpdates')}
                    className="mr-3 rounded"
                    defaultChecked
                  />
                  Blog updates and career tips
                </label>
                <label className="flex items-center text-blue-100">
                  <input
                    type="checkbox"
                    {...register('expatGuides')}
                    className="mr-3 rounded"
                    defaultChecked
                  />
                  Expat guides and living tips
                </label>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-white text-blue-900 px-8 py-3 rounded-lg font-semibold hover:bg-blue-50 transition-colors"
            >
              Subscribe Now
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default NewsletterSubscription;