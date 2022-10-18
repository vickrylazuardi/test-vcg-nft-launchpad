import React from "react";
import { FormInputImage } from "../../components/Common/formComponent";

export default function Step2(props) {
  return (
    <div className="">
      <p className="text-lg font-bold">Project Information</p>
      <div className="mt-4">
        <div className="flex md:block items-center">
          <div
            className="w-1/4 md:w-full mb-2 text-sm font-semibold"
            style={{ color: "#9AA4BF" }}
          >
            <label>Project Image</label>
          </div>
          <FormInputImage />
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Project Name</label>
        </div>
        <div className="wrap-input flex-1">
          <input type="text" className="w-full" placeholder="Project Name" />
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Description</label>
        </div>
        <div className="wrap-input flex-1">
          <textarea
            type="text"
            className="w-full"
            placeholder="Project Name"
            rows={3}
          ></textarea>
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Start Project</label>
        </div>
        <div className="wrap-input flex-1">
          <input className="date-input" type="datetime-local" />
        </div>
      </div>
      <div className="flex md:block items-center mt-5">
        <div
          className="w-1/4 md:w-full mb-2 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Sale Duration (Days)</label>
        </div>
        <div className="wrap-input flex-1">
          <input type="text" defaultValue={31} style={{ width: "45px" }} />
        </div>
      </div>
      <div className="mt-10">
        <div
          className="mb-3 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Video Link</label>
        </div>
        <div className="wrap-input flex-1">
          <div className="input-group">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-url">URL Link</label>
            </div>
            <input
              type="text"
              id="input-url"
              placeholder="https://youtube.com"
            />
          </div>
        </div>
      </div>
      <div className="mt-10">
        <div
          className="mb-3 text-sm font-semibold"
          style={{ color: "#9AA4BF" }}
        >
          <label>Social Media (You can fill or leave it blank)</label>
        </div>
        <div className="wrap-input flex-1">
          <div className="input-group">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-url">Website</label>
            </div>
            <input
              type="text"
              id="input-url"
              placeholder="https://youtube.com"
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-medium">Medium</label>
            </div>
            <input
              type="text"
              id="input-medium"
              placeholder="https://website.com"
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-youtube">Youtube</label>
            </div>
            <input
              type="text"
              id="input-youtube"
              placeholder="https://youtube,com"
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-tele">Telegram Group</label>
            </div>
            <input
              type="text"
              id="input-tele"
              placeholder="https://web.telegram.org/k/"
            />
          </div>
          <div className="input-group mt-8">
            <div className="input-label w-2/12 md:w-1/4">
              <label htmlFor="input-discord">Discord</label>
            </div>
            <input
              type="text"
              id="input-discord"
              placeholder="https://discord.com"
            />
          </div>
        </div>
      </div>
    </div>
  );
}
