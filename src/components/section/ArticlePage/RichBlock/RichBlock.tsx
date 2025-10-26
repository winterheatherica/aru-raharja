import Image from "next/image";

export default function RichBlock() {
  return (
    <div className="rich mb-8 p-6 bg-bumnwhite-1 rounded-lg border border-bumngray-8">
      <div className="rich-wrap flex gap-6 items-center">
        <div className="rich-meta text-bumnblue-2">
          <svg viewBox="0 0 448 512" xmlns="http://www.w3.org/2000/svg" className="w-8 h-8">
            <path d="M446.6 222.7c-1.8-8-6.8-15.4-12.5-18.5..."></path>
          </svg>
        </div>
        <div>
          <div className="rich-title font-semibold text-lg">Explore Professional blogger templates</div>
          <div className="rich-info text-sm text-bumnslate-6">Unlimited blogging templates, plugins assets &amp; elements.</div>
        </div>
        <div className="ml-auto">
          <a className="rich-bt inline-block bg-bumnblue-2 text-white px-4 py-2 rounded-md" href="#" rel="nofollow noopener">View All</a>
        </div>
      </div>
      <div className="rich-img mt-4">
        {/* <Image src="https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEgK3otllf5g4AOQ8Q1B64NnF9gnMCZZxeONOX-tEpIDawP96p7sjYOAd-A-3TOfx6QepZpNhaXN2C_XfeDQb865Hb0lQMQS37hEZ3u3p7UmxDBegp_TFQ001xUtmJZjNvQOwlAX4xlrZcetEOhfb-cYAhXyK7so97C1B0JNlsfUVumfEXIlF0Qdf0FtjZh2/s230-e90-rw/" alt="blogger themes" width={210} height={120} /> */}
      </div>
    </div>
  );
}
