import pathlib
import uuid

import requests_mock

from help_to_heat.frontdoor import interface

__here__ = pathlib.Path(__file__).parent


def test_answers():
    session_id = uuid.uuid4()
    page_name = "country"
    data = {"floob": "blumble", "country": "England"}
    result = interface.api.session.save_answer(session_id=session_id, page_name=page_name, data=data)
    expected = {"country": "England"}
    assert result == expected, (result, expected)

    result = interface.api.session.get_answer(session_id=session_id, page_name=page_name)
    assert result == expected, (result, expected)


def test_answer_missing():
    session_id = uuid.uuid4()
    page_name = "country"
    expected = {}
    result = interface.api.session.get_answer(session_id=session_id, page_name=page_name)
    assert result == expected, (result, expected)


def test_duplicate_answer():
    session_id = uuid.uuid4()
    page_name = "country"
    data = {"floob": "blumble", "country": "England"}
    result = interface.api.session.save_answer(session_id=session_id, page_name=page_name, data=data)
    expected = {"country": "England"}
    assert result == expected, (result, expected)

    data = {"floob": "blumble", "country": "Wales"}
    result = interface.api.session.save_answer(session_id=session_id, page_name=page_name, data=data)
    expected = {"country": "Wales"}
    assert result == expected, (result, expected)

    result = interface.api.session.get_answer(session_id=session_id, page_name=page_name)
    assert result == expected, (result, expected)


def test_get_address():
    json_file_path = __here__ / "sample_os_api_response.json"
    data = json_file_path.read_text()

    with requests_mock.Mocker() as m:
        m.get("https://api.os.uk/search/places/v1/find", text=data)
        result = interface.api.address.get_addresses("foobar")
        assert result[0]['uprn'] == "100023336956"
