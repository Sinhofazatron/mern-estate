export default function CreateListing() {
  return (
    <main className="p-3 max-w-4xl mx-auto">
      <h1 className="text-3xl font-semibold text-center my-7">
        Добавить объект
      </h1>
      <form className="flex flex-col sm:flex-row">
        <div className="flex flex-col gap-4 flex-1">
          <input
            type="text"
            placeholder="Название"
            className="border p-3 rounded-lg"
            id="name"
            maxLength="62"
            minLength="10"
            required
          />
          <textarea
            type="text"
            placeholder="Описание"
            className="border p-3 rounded-lg"
            id="description"
            required
          />
          <input
            type="text"
            placeholder="Адрес"
            className="border p-3 rounded-lg"
            id="address"
            required
          />
          <div>
            <div className="flex gap-2">
              <input type="checkbox" id="sale" className="w-5" />
              <span>Сдать</span>
            </div>
          </div>
        </div>
      </form>
    </main>
  );
}
