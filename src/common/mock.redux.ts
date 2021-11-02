import * as reactRedux from "react-redux";

function mockDispatch(...results: unknown[]): jest.Mock {
    let dispatchMock = jest.fn();

    if (results.length > 0) {
        dispatchMock = results.reduce(
            (pV: jest.Mock, cV: unknown) => pV.mockReturnValueOnce(Promise.resolve(cV)),
            dispatchMock,
        );
    } else {
        dispatchMock.mockReturnValue(Promise.resolve());
    }

    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => dispatchMock as any);

    return dispatchMock;
}

function mockDispatchReject(...messages: string[]): jest.Mock<unknown> {
    let dispatchMock = jest.fn();

    if (messages.length > 0) {
        dispatchMock = messages.reduce(
            (pV: jest.Mock, cV: string) =>
                pV.mockRejectedValueOnce({
                    response: {
                        data: { message: cV },
                    },
                }),
            dispatchMock,
        );
    } else {
        dispatchMock.mockRejectedValue(Promise.reject());
    }

    jest.spyOn(reactRedux, "useDispatch").mockImplementation(() => dispatchMock as any);

    return dispatchMock;
}

export { mockDispatch, mockDispatchReject };
