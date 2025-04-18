import React from "react";

const AboutUs = () => {
  return (
    <div className="bg-zinc-800 rounded-lg shadow-lg p-6 max-w-4xl mx-auto my-8">
      <h2 className="text-3xl font-bold text-amber-100 mb-6 text-center">About Our Team</h2>
      
      <div className="flex flex-col md:flex-row gap-6">
        {/* Developer Card with LinkedIn */}
        <div className="flex-1 bg-zinc-700 p-6 rounded-lg hover:bg-zinc-600 transition duration-300">
          <div className="text-center mb-4">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-amber-100 mb-3">
              <img 
                src="/sid.jpg" 
                alt="Siddharth Mishra"
                className="w-full h-full object-cover"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23F59E0B' width='100' height='100' rx='50'/%3E%3Ctext fill='%231F2937' font-family='sans-serif' font-size='40' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3ESM%3C/text%3E%3C/svg%3E"
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-amber-100">Siddharth Mishra</h3>
            <p className="text-zinc-300">Lead Developer</p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center text-zinc-200">
              <svg className="w-5 h-5 mr-2 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:siddharthmishra457@gmail.com" className="hover:text-amber-100">siddharthmishra457@gmail.com</a>
            </p>
            <p className="flex items-center text-zinc-200">
              <svg className="w-5 h-5 mr-2 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/>
              </svg>
              <a href="https://www.linkedin.com/in/siddharth-mishra-3755aa301" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">
                LinkedIn Profile
              </a>
            </p>
            <p className="flex items-center text-zinc-200">
              <svg className="w-5 h-5 mr-2 text-amber-100" fill="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path fillRule="evenodd" clipRule="evenodd" d="M12 2C6.477 2 2 6.477 2 12c0 4.42 2.865 8.166 6.839 9.489.5.092.682-.217.682-.482 0-.237-.008-.866-.013-1.7-2.782.603-3.369-1.34-3.369-1.34-.454-1.156-1.11-1.462-1.11-1.462-.908-.62.069-.608.069-.608 1.003.07 1.531 1.03 1.531 1.03.892 1.529 2.341 1.087 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.11-4.555-4.943 0-1.091.39-1.984 1.029-2.683-.103-.253-.446-1.27.098-2.647 0 0 .84-.269 2.75 1.025A9.564 9.564 0 0112 6.836c.85.004 1.705.114 2.504.336 1.909-1.294 2.747-1.025 2.747-1.025.546 1.377.203 2.394.1 2.647.64.699 1.028 1.592 1.028 2.683 0 3.842-2.339 4.687-4.566 4.935.359.309.678.919.678 1.852 0 1.336-.012 2.415-.012 2.743 0 .267.18.578.688.48C19.138 20.163 22 16.418 22 12c0-5.523-4.477-10-10-10z"/>
              </svg>
              <a href="https://github.com/CoderSid28" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">
                GitHub Profile
              </a>
            </p>
          </div>
        </div>

        {/* Company Card */}
        <div className="flex-1 bg-zinc-700 p-6 rounded-lg hover:bg-zinc-600 transition duration-300">
          <div className="text-center mb-4">
            <div className="w-24 h-24 mx-auto rounded-full overflow-hidden bg-white p-2 mb-3">
              <img 
                src="/banana.png" 
                alt="Banana Soft Infotech"
                className="w-full h-full object-contain"
                onError={(e) => {
                  e.target.onerror = null; 
                  e.target.src = "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='100' height='100' viewBox='0 0 100 100'%3E%3Crect fill='%23F59E0B' width='100' height='100' rx='50'/%3E%3Ctext fill='%231F2937' font-family='sans-serif' font-size='40' x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle'%3EBS%3C/text%3E%3C/svg%3E"
                }}
              />
            </div>
            <h3 className="text-xl font-semibold text-amber-100">Banana Soft Infotech</h3>
            <p className="text-zinc-300">Development Company</p>
          </div>
          <div className="space-y-2">
            <p className="flex items-center text-zinc-200">
              <svg className="w-5 h-5 mr-2 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
              </svg>
              <a href="mailto:bananasoftinfotech@gmail.com" className="hover:text-amber-100">bananasoftinfotech@gmail.com</a>
            </p>
            <p className="flex items-center text-zinc-200">
              <svg className="w-5 h-5 mr-2 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
              </svg>
              <span>Serve | Service | Solution</span>
            </p>
            <p className="flex items-center text-zinc-200">
              <svg className="w-5 h-5 mr-2 text-amber-100" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" />
              </svg>
              <a href="https://www.bananasit.com" target="_blank" rel="noopener noreferrer" className="hover:text-amber-100">
                www.bananasit.com
              </a>
            </p>
          </div>
        </div>
      </div>

      <div className="mt-8 text-center text-zinc-300">
        <p>We're passionate about creating beautiful, functional digital experiences that make a difference.</p>
      </div>
    </div>
  );
};

export default AboutUs;