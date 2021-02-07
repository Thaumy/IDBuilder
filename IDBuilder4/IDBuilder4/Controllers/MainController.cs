using Microsoft.AspNetCore.Mvc;
using Microsoft.Extensions.Logging;
using System;
using System.Collections;
using System.Collections.Generic;
using System.Diagnostics;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

using WaterLibrary.Utils;
using Newtonsoft.Json;

namespace IDBuilder4.Controllers
{
    public class MainController : Controller
    {
        public MainController()
        {
        }

        public IActionResult Home()
        {
            return View();
        }

        [HttpPost]
        public string INIT()
        {
            Sig_INIT(out string UUID_N, out string UUID_D, out string YMD_XXXX, out string YMD);
            Rnd_INIT(out string RndNumber, out string RndString);
            Rsa_INIT(out string PubK, out string PriK);

            return JsonConvert.SerializeObject(new Hashtable()
            {
                {"UUID_N", UUID_N},
                {"UUID_D", UUID_D},
                {"YMD_XXXX", YMD_XXXX},
                {"YMD", YMD},
                {"RndNumber", RndNumber},
                {"RndString", RndString},
                {"PubK", PubK},
                {"PriK", PriK},
            });
        }

        private static void Sig_INIT(out string UUID_N, out string UUID_D, out string YMD_XXXX, out string YMD)
        {
            DateTime now = DateTime.Now;

            //时间补位
            string Year = Convert.ToString(now.Year).PadLeft(2, '0');
            string Month = Convert.ToString(now.Month).PadLeft(2, '0');
            string Day = Convert.ToString(now.Day).PadLeft(2, '0');
            string Hour = Convert.ToString(now.Hour).PadLeft(2, '0');
            string Minute = Convert.ToString(now.Minute).PadLeft(2, '0');
            string TOTALSTRING = Year + Month + Day + Hour + Minute;

            UUID_N = Guid.NewGuid().ToString("N");
            UUID_D = Guid.NewGuid().ToString("D");
            YMD_XXXX = TOTALSTRING + "_" + Guid.NewGuid().ToString("N").Substring(0, 4);
            YMD = TOTALSTRING;
        }

        private static void Rsa_INIT(out string PubK, out string PriK)
        {
            var kp = new KeyPair(2048);
            PriK = kp.PrivateKey;
            PubK = kp.PublicKey;
        }

        private static void Rnd_INIT(out string RndNumber, out string RndString)
        {
            //RSA密钥对
            RndNumber = GenRnd(12, "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0");
            RndString = GenRnd(12,
                "0", "1", "2", "3", "4", "5", "6", "7", "8", "9", "0",
                "a", "b", "c", "d", "e", "f", "g", "h", "i", "j", "k", "l", "m", "n", "o", "p", "q", "r", "s", "t", "u", "v", "w", "x", "y", "z",
                "A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q", "R", "S", "T", "U", "V", "W", "X", "Y", "Z");

            static string GenRnd(int Length, params string[] dic)
            {
                StringBuilder builder = new();
                Random rnd = new((int)DateTime.Now.Ticks);
                while (Length > 0)
                {
                    int index = rnd.Next(0, dic.Length - 1);
                    builder.Append(dic[index]);
                    Length--;
                }
                return builder.ToString();
            }
        }


        [HttpPost]
        public string MD5_Encrypt(string Plain)
        {
            return MathH.MD5(Plain);
        }
        [HttpPost]
        public string SHA1_Encrypt(string Plain)
        {
            return MathH.SHA1(Plain);
        }
        [HttpPost]
        public string RSA_Encrypt(string Plain, string PubK)
        {
            try
            {
                Replace(ref Plain);
                Replace(ref PubK);
                return MathH.RSAEncrypt(Plain, PubK);
            }
            catch
            {
                return null;
            }

        }
        [HttpPost]
        public string RSA_Decrypt(string Cipher, string PriK)
        {
            try
            {
                Replace(ref Cipher);
                Replace(ref PriK);
                return MathH.RSADecrypt(Cipher, PriK);
            }
            catch
            {
                return null;
            }
        }

        private static void Replace(ref string src)
        {
            if (src != null)
            {
                src = src.Replace("&#xA;", "\n").Replace("&#x2B;", "+");
            }
        }
    }
}
