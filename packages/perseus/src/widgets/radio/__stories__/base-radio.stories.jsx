// @flow
import {action} from "@storybook/addon-actions";
import * as React from "react";

import {generateChoice} from "../../__testdata__/base-radio_testdata.js";
import BaseRadio from "../base-radio.jsx";

type StoryArgs = {|
    multipleSelect: boolean,
    editMode: boolean,
    countChoices: boolean,
|};

type Story = {|
    title: string,
    args: StoryArgs,
|};

export default ({
    title: "Perseus/Widgets/Radio/Base Radio",
    args: {
        multipleSelect: false,
        editMode: false,
        countChoices: false,
    },
}: Story);

const defaultProps = {
    apiOptions: {
        satStyling: false,
    },
    choices: [
        generateChoice({
            content: "Content 1",
        }),
        generateChoice({
            content: "Content 2",
        }),
        generateChoice({
            content: "Content 3",
            correct: true,
        }),
        generateChoice({
            isNoneOfTheAbove: true,
        }),
    ],
    deselectEnabled: false,
    editMode: false,
    labelWrap: false,
    countChoices: false,
    numCorrect: 1,
    multipleSelect: false,

    // A callback indicating that this choice has changed. Its argument is
    // an object with two keys: `checked` and `crossedOut`. Each contains
    // an array of boolean values, specifying the new checked and
    // crossed-out value of each choice.
    onChange: action("changed"),

    // Whether this widget was the most recently used widget in this
    // Renderer. Determines whether we'll auto-scroll the page upon
    // entering review mode.
    isLastUsedWidget: false,
};

export const Interactive = (args: StoryArgs): React.Node => {
    const overwrittenProps = {...defaultProps, ...args};
    return <BaseRadio {...overwrittenProps} />;
};

export const DefaultSingleSelect = (args: StoryArgs): React.Node => {
    const overwrittenProps = {...defaultProps, multipleSelect: false};
    return <BaseRadio {...overwrittenProps} />;
};

export const DefaultMultipleSelect = (args: StoryArgs): React.Node => {
    const overwrittenProps = {...defaultProps, multipleSelect: true};
    return <BaseRadio {...overwrittenProps} />;
};

export const DefaultMultipleSelectCountChoices = (
    args: StoryArgs,
): React.Node => {
    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: true,
        numCorrect: 2,
        countChoices: true,
    };
    return <BaseRadio {...overwrittenProps} />;
};

export const SingleSelected = (args: StoryArgs): React.Node => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => generateChoice({content: `Choice ${i + 1}`}));
    choices[1].checked = true;

    const overwrittenProps = {...defaultProps, multipleSelect: false, choices};
    return <BaseRadio {...overwrittenProps} />;
};

export const MultipleSelected = (args: StoryArgs): React.Node => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => generateChoice({content: `Choice ${i + 1}`}));
    choices[1].checked = true;
    choices[2].checked = true;

    const overwrittenProps = {...defaultProps, multipleSelect: true, choices};
    return <BaseRadio {...overwrittenProps} />;
};

export const SingleKitchenSink = (args: StoryArgs): React.Node => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => {
            const choice = generateChoice({
                content: `Choice ${i + 1}`,
                rationale: "This is a neat rationale",
                hasRationale: true,
                showRationale: true,
                correct: false,
                showCorrectness: true,
            });

            return choice;
        });
    choices[1].checked = true;
    choices[2].correct = true;

    const rubricChoices = choices.map(({correct}) => ({
        // note(matthew): reviewModeRubric.choices requires content,
        // but I don't see how it's getting used and Flow gets mad
        // when I use choice.content because it's not a string.
        // reviewModeRubric could probably use a look over.
        content: "",
        correct,
    }));

    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: false,
        reviewModeRubric: {choices: rubricChoices},
        choices,
    };
    return <BaseRadio {...overwrittenProps} />;
};

export const MultipleKitchenSink = (args: StoryArgs): React.Node => {
    const choices = Array(4)
        .fill(null)
        .map((_, i) => {
            const choice = generateChoice({
                content: `Choice ${i + 1}`,
                rationale: "This is a neat rationale",
                hasRationale: true,
                showRationale: true,
                correct: false,
                showCorrectness: true,
            });

            return choice;
        });
    choices[1].checked = true;
    choices[2].checked = true;
    choices[2].correct = true;
    choices[3].correct = true;

    const rubricChoices = choices.map((c) => ({
        // note(matthew): reviewModeRubric.choices requires content,
        // but I don't see how it's getting used and Flow gets mad
        // when I use choice.content because it's not a string.
        // reviewModeRubric could probably use a look over.
        content: "",
        correct: c.correct,
    }));

    const overwrittenProps = {
        ...defaultProps,
        multipleSelect: true,
        numCorrect: 2,
        reviewModeRubric: {choices: rubricChoices},
        choices,
    };
    return <BaseRadio {...overwrittenProps} />;
};
