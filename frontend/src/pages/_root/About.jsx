import { ourDetails } from "../../data/info";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import TextToHtml from "../../components/shared/common/TextToHtml";

const About = () => {
  return (
    <PageWrapper>
      <PageContent title="About Us">
        {ourDetails && (
          <div className="flex flex-col gap-4">
            {/* Our Story */}
            <section>
              <TextToHtml
                content={ourDetails.ourStory ? ourDetails.ourStory : ""}
              />
            </section>

            {/* Our Brand & Key Points in Grid */}
            <section className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Our Brand */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Brand</h2>
                <TextToHtml content={ourDetails.ourBrand?ourDetails.ourBrand:""} />
              </div>

              {/* Key Points */}
              <div>
                <h2 className="text-2xl font-serif mb-2 underline">
                  Key objectives are to:
                </h2>
                <ol className="list-decimal list-inside space-y-2">
                  {ourDetails.keyPoints.map((point, index) => (
                    <li key={index} className="font-semibold">
                      {point.heading}:
                      <p className="font-normal text-gray-700 ml-4">
                        {point.content}
                      </p>
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
        )}
      </PageContent>
    </PageWrapper>
  );
};

export default About;
