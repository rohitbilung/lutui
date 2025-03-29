import { Card, CardHeader, CardContent } from "@/components/ui/card";
import PageWrapper from "../../components/shared/common/layouts/PageWrapper";
import PageContent from "../../components/shared/common/layouts/PageContent";
import { ourDetails } from "../../data/info";

const About = () => {
  return (
    <PageWrapper>
      <PageContent title="About Us">
        {ourDetails && (
          <div>
            {/* Our Story */}
            <section>
              <h2 className="text-2xl font-bold mb-4">Our Story</h2>
              <div className="prose">{ourDetails.ourStory}</div>
            </section>

            {/* Our Brand & Key Points in Grid */}
            <section className="md:grid md:grid-cols-2 gap-8">
              {/* Our Brand */}
              <div>
                <h2 className="text-2xl font-bold mb-4">Our Brand</h2>
                <div className="prose">{ourDetails.ourBrand}</div>
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
